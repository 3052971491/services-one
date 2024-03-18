import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Like, Repository, In, EntityManager, Between } from 'typeorm'
import { instanceToPlain, plainToInstance } from 'class-transformer'
import { genSalt, hash, compare, genSaltSync, hashSync } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import xlsx from 'node-xlsx'
import ms from 'ms'

import { ResultData } from '../../common/utils/result'
import { generateRandomSystemAccount, getCurrentTimestamp, getRedisKey } from '../../common/utils/utils'
import { RedisKeyPrefix } from '../../common/enums/redis-key-prefix.enum'
import { AppHttpCode } from '../../common/enums/code.enum'
import { RedisService } from '../../common/libs/redis/redis.service'
import { validPhone, validEmail } from '../../common/utils/validate'
import { UserType } from '../../common/enums/common.enum'
import { PermService } from '../perm/perm.service'
import { UserEntity } from './user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { RegisterUserDto } from './dto/register-user.dto'
import { FindUserListDto } from './dto/find-user-list.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateOrUpdateUserRolesDto } from './dto/create-user-roles.dto'
import { CreateTokenDto } from './dto/create-token.dto'
import { RoleEntity } from 'src/system/role/role.entity'
import { MenuService } from '../menu/menu.service'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectEntityManager()
    private readonly userManager: EntityManager,
    private readonly config: ConfigService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly permService: PermService,
    private readonly menuervice: MenuService,
  ) {}

  async findOneById(id: string): Promise<UserEntity> {
    const redisKey = getRedisKey(RedisKeyPrefix.USER_INFO, id)
    const result = await this.redisService.hGetAll(redisKey)
    // plainToInstance 去除 password slat
    let user = plainToInstance(UserEntity, result, { enableImplicitConversion: true })
    if (!user?.id) {
      user = await this.userRepo.findOne({ where: { id } })
      user = plainToInstance(UserEntity, { ...user }, { enableImplicitConversion: true })
      await this.redisService.hmset(
        redisKey,
        instanceToPlain(user),
        ms(this.config.get<string>('jwt.expiresin')) / 1000,
      )
    }
    user.password = ''
    user.salt = ''
    return user
  }

  async findOneByAccount(account: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { account } })
  }

  /** 创建用户 */
  async create(dto: CreateUserDto): Promise<ResultData> {
    // 防止重复创建 start
    if (await this.userRepo.findOne({ where: { phoneNum: dto.phoneNum } }))
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '当前手机号已存在，请调整后重新注册')
    if (await this.userRepo.findOne({ where: { email: dto.email } }))
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '当前邮箱已存在，请调整后重新注册')
    // 防止重复创建 end
    const salt = await genSalt()
    let account = ''
    do {
      account = generateRandomSystemAccount()
      // 检查账号是否已存在于系统中
      const o = await this.findOneByAccount(account)
      if (!o) {
        break
      }
      // 如果账号已存在，清空并重新生成账号
      account = ''
    } while (true)
    dto.account = account
    if (!dto.nickname) {
      const timestamp = getCurrentTimestamp() // 获取当前时区的时间戳
      const defaultNickname = `User_${timestamp}` // 生成默认昵称，格式为"User" + 时间戳
      dto.nickname = defaultNickname
    }
    dto.password = await hash(dto.password, salt)
    // plainToInstance  忽略转换 @Exclude 装饰器
    const user = plainToInstance(UserEntity, { salt, ...dto }, { ignoreDecorators: true })
    const result = await this.userManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.save<UserEntity>(user)
    })
    return ResultData.ok(instanceToPlain(result))
  }

  /** 注册用户 */
  async register(dto: RegisterUserDto): Promise<ResultData> {
    if (dto.password !== dto.confirmPassword)
      return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '两次输入密码不一致，请重试')
    // 防止重复创建 start
    if (await this.userRepo.findOne({ where: { phoneNum: dto.phoneNum } }))
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '当前手机号已存在，请调整后重新注册')
    // 防止重复创建 end
    const salt = await genSalt()
    dto.password = await hash(dto.password, salt)
    // plainToInstance  忽略转换 @Exclude 装饰器
    let account = ''
    do {
      account = generateRandomSystemAccount()
      // 检查账号是否已存在于系统中
      const o = await this.findOneByAccount(account)
      if (!o) {
        break
      }
      // 如果账号已存在，清空并重新生成账号
      account = ''
    } while (true)

    const timestamp = getCurrentTimestamp() // 获取当前时区的时间戳
    const defaultNickname = `User_${timestamp}` // 生成默认昵称，格式为"User" + 时间戳

    const user = plainToInstance(
      UserEntity,
      { salt, ...dto, account, nickname: defaultNickname },
      { ignoreDecorators: true },
    )
    const result = await this.userManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.save<UserEntity>(user)
    })
    return ResultData.ok(account)
  }

  /**
   * 登录
   * account 有可能是 帐号/手机/邮箱
   */
  async login(account: string, password: string): Promise<ResultData> {
    let user = null
    if (validPhone(account)) {
      // 手机登录
      user = await this.userRepo.findOne({ where: { phoneNum: account } })
    } else if (validEmail(account)) {
      // 邮箱
      user = await this.userRepo.findOne({ where: { email: account } })
    } else {
      // 帐号
      user = await this.findOneByAccount(account)
    }
    if (!user) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '帐号或密码错误')
    const checkPassword = await compare(password, user.password)
    if (!checkPassword) return ResultData.fail(AppHttpCode.USER_PASSWORD_INVALID, '帐号或密码错误')
    if (user.status === 0)
      return ResultData.fail(AppHttpCode.USER_ACCOUNT_FORBIDDEN, '您已被禁用，如需正常使用请联系管理员')
    // 生成 token
    const data = this.genToken({ id: user.id })
    return ResultData.ok(data)
  }

  async updateToken(userId: string): Promise<ResultData> {
    const data = this.genToken({ id: userId })
    return ResultData.ok(data)
  }

  /**
   * 批量导入用户
   */
  async importUsers(file: Express.Multer.File): Promise<ResultData> {
    const acceptFileType = 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    if (!acceptFileType.indexOf(file.mimetype))
      return ResultData.fail(AppHttpCode.FILE_TYPE_ERROR, '文件类型错误，请上传 .xls 或 .xlsx 文件')
    if (file.size > 5 * 1024 * 1024)
      return ResultData.fail(AppHttpCode.FILE_SIZE_EXCEED_LIMIT, '文件大小超过，最大支持 5M')
    const workSheet = xlsx.parse(file.buffer)
    // 需要处理 excel 内帐号 手机号 邮箱 是否有重复的情况
    if (workSheet[0].data.length === 0) return ResultData.fail(AppHttpCode.DATA_IS_EMPTY, 'excel 导入数据为空')
    const userArr = []
    const accountMap = new Map()
    const phoneMap = new Map()
    const emailMap = new Map()
    // 从 1 开始是去掉 excel 帐号等文字提示
    for (let i = 1, len = workSheet[0].data.length; i < len; i++) {
      const dataArr = workSheet[0].data[i] as Array<any>
      if (dataArr.length === 0) break
      const [account, phone, email, avatar] = dataArr
      userArr.push({ account, phoneNum: phone, email, avatar })
      if (account && !accountMap.has(account)) {
        accountMap.set(account, [])
      } else if (account) {
        // 有重复的
        accountMap.get(account).push(i + 1)
      } else {
        return ResultData.fail(AppHttpCode.DATA_IS_EMPTY, '上传文件帐号有空数据，请检查后再导入')
      }
      if (!phoneMap.has(phone)) {
        phoneMap.set(phone, [])
      } else if (phone) {
        phoneMap.get(phone).push(i + 1)
      }
      if (email && !emailMap.has(email)) {
        emailMap.set(email, [])
      } else if (email) {
        emailMap.get(email).push(i + 1)
      }
    }
    const accountErrArr = []
    for (let [key, val] of accountMap) {
      if (val.length > 0) {
        accountErrArr.push({ key, val })
      }
    }
    const phoneErrArr = []
    for (let [key, val] of phoneMap) {
      if (val.length > 0) {
        phoneErrArr.push({ key, val })
      }
    }
    const emailErrArr = []
    for (let [key, val] of emailMap) {
      if (val.length > 0) {
        emailErrArr.push({ key, val })
      }
    }
    if (accountErrArr.length > 0 || phoneErrArr.length > 0 || emailErrArr.length > 0) {
      return ResultData.fail(AppHttpCode.PARAM_INVALID, '导入 excel 内部有数据重复或数据有误，请修改调整后上传导入', {
        account: accountErrArr,
        phone: phoneErrArr,
        email: emailErrArr,
      })
    }
    // 若 excel 内部无重复，则需要判断 excel 中数据 是否与 数据库的数据重复
    const existingAccount = await this.userRepo.find({
      select: ['account'],
      where: { account: In(userArr.map((v) => v.account)) },
    })
    if (existingAccount.length > 0) {
      existingAccount.forEach((v) => {
        // userArr 中的数据 下标 换算成 excel 中的 行号 + 2
        accountErrArr.push({ key: v.account, val: [userArr.findIndex((m) => m.account === v.account) + 2] })
      })
    }
    // 手机号、邮箱非必填，所以查询存在重复的 过滤掉 空数据
    const existingPhone = await this.userRepo.find({
      select: ['phoneNum'],
      where: { account: In(userArr.map((v) => v.phoneNum).filter((v) => !!v)) },
    })
    if (existingPhone.length > 0) {
      existingPhone.forEach((v) => {
        // userArr 中的数据 下标 换算成 excel 中的 行号 + 2
        phoneErrArr.push({ key: v.phoneNum, val: [userArr.findIndex((m) => m.phoneNum === v.phoneNum) + 2] })
      })
    }
    const existingEmail = await this.userRepo.find({
      select: ['email'],
      where: { account: In(userArr.map((v) => v.email).filter((v) => !!v)) },
    })
    if (existingEmail.length > 0) {
      existingEmail.forEach((v) => {
        // userArr 中的数据 下标 换算成 excel 中的 行号 + 2
        emailErrArr.push({ key: v.email, val: [userArr.findIndex((m) => m.email === v.email) + 2] })
      })
    }
    if (accountErrArr.length > 0 || phoneErrArr.length > 0 || emailErrArr.length > 0) {
      return ResultData.fail(AppHttpCode.PARAM_INVALID, '导入 excel 系统中已有重复项，请修改调整后上传导入', {
        account: accountErrArr,
        phone: phoneErrArr,
        email: emailErrArr,
      })
    }
    // excel 与数据库无重复，准备入库
    const password = this.config.get<string>('user.initialPassword')
    userArr.forEach((v) => {
      const salt = genSaltSync()
      const encryptPw = hashSync(password, salt)
      v['password'] = encryptPw
      v['salt'] = salt
    })
    const result = await this.userManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.save<UserEntity>(
        plainToInstance(UserEntity, userArr, { ignoreDecorators: true }),
      )
    })
    return ResultData.ok(instanceToPlain(result))
  }

  /** 更新用户信息 */
  async update(dto: UpdateUserDto, currUser: UserEntity): Promise<ResultData> {
    const existing = await this.findOneById(dto.id)
    if (!existing) return ResultData.fail(AppHttpCode.USER_NOT_FOUND, '当前用户不存在或已删除')
    if (existing.status === 0)
      return ResultData.fail(AppHttpCode.USER_ACCOUNT_FORBIDDEN, '当前用户已被禁用，不可更新用户信息')
    if (existing.isSystem === UserType.SUPER_ADMIN && currUser.isSystem === UserType.ORDINARY_USER) {
      return ResultData.fail(AppHttpCode.USER_FORBIDDEN_UPDATE, '您不可修改超管信息喔')
    }

    const roleIds = dto.roleIds || []
    const userInfo = instanceToPlain(dto)
    delete userInfo.roleIds

    const { password, ...user } = userInfo
    if (dto?.password) {
      const salt = existing?.salt ? existing.salt : await genSalt()
      user.password = await hash(dto.password, salt)
    }
    const { affected } = await this.userManager.transaction(async (transactionalEntityManager) => {
      await this.createOrUpdateUserRole({ userId: dto.id, roleIds })
      return await transactionalEntityManager.update<UserEntity>(UserEntity, dto.id, { ...user })
    })

    if (!affected) ResultData.fail(AppHttpCode.SERVICE_ERROR, '更新失败，请稍后重试')
    await this.redisService.del(getRedisKey(RedisKeyPrefix.USER_INFO, dto.id))
    // redis 更新用户信息
    return ResultData.ok()
  }

  /**
   * 更新或重置用户密码
   * @reset 是否重置, false 则使用传入的 password 更新
   */
  async updatePassword(userId: string, password: string, reset: boolean, currUser: UserEntity): Promise<ResultData> {
    const existing = await this.userRepo.findOne({ where: { id: userId, isDeleted: false } })
    if (!existing)
      return ResultData.fail(AppHttpCode.USER_NOT_FOUND, `用户不存在或已删除，${reset ? '重置' : '更新'}失败`)
    if (existing.status === 0)
      return ResultData.fail(AppHttpCode.USER_ACCOUNT_FORBIDDEN, '当前用户已被禁用，不可重置用户密码')
    if (existing.isSystem === UserType.SUPER_ADMIN && currUser.isSystem === UserType.ORDINARY_USER) {
      return ResultData.fail(AppHttpCode.USER_FORBIDDEN_UPDATE, '您不可修改超管信息喔')
    }
    const newPassword = reset ? this.config.get<string>('user.initialPassword') : password
    const user = { id: userId, password: await hash(newPassword, existing.salt) }
    const { affected } = await this.userManager.transaction(async (transactionalEntityManager) => {
      return await transactionalEntityManager.update<UserEntity>(UserEntity, userId, user)
    })
    if (!affected) ResultData.fail(AppHttpCode.SERVICE_ERROR, `${reset ? '重置' : '更新'}失败，请稍后重试`)
    return ResultData.ok()
  }

  /** 创建 or 更新用户-角色 */
  async createOrUpdateUserRole(dto: CreateOrUpdateUserRolesDto): Promise<ResultData> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId }, relations: ['roles'] })
    if (user) {
      const roles = await this.roleRepository.findByIds(dto.roleIds) // 假设存在一个方法用于批量查询角色信息
      user.roles = roles // 假设 UserEntity 中有一个 roles 属性来维护与角色的关系
    }
    const res = await this.userRepo.save(user)
    // const userRoleList = plainToInstance(
    //   UserRoleEntity,
    //   dto.roleIds.map((roleId) => {
    //     return { roleId, userId: dto.userId }
    //   }),
    // )
    // const res = await this.userManager.transaction(async (transactionalEntityManager) => {
    //   await transactionalEntityManager.delete(UserRoleEntity, { userId: dto.userId })
    //   const result = await transactionalEntityManager.save<UserRoleEntity>(userRoleList)
    //   return result
    // })
    if (!res) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '用户更新角色失败')
    await this.redisService.set(getRedisKey(RedisKeyPrefix.USER_ROLE, dto.userId), JSON.stringify(dto.roleIds))
    await this.redisService.del([
      getRedisKey(RedisKeyPrefix.USER_MENU, dto.userId),
      getRedisKey(RedisKeyPrefix.USER_PERM, dto.userId),
    ])
    return ResultData.ok()
  }

  /** 查询用户列表 */
  async findList(dto: FindUserListDto, userId: string): Promise<ResultData> {
    const { page, size, account, nickname, phoneNum, email, status } = dto
    const where: any = {
      ...(status ? { status } : null),
      ...(account ? { account: Like(`%${account}%`) } : null),
      ...(nickname ? { nickname: Like(`%${nickname}%`) } : null),
      ...(phoneNum ? { phoneNum: Like(`%${phoneNum}%`) } : null),
      ...(email ? { email: Like(`%${email}%`) } : null),
      isDeleted: false,
    }
    if (dto.startDate && dto.endDate) {
      // 添加创建时间范围条件
      where.createdAt = Between(dto.startDate, dto.endDate)
    }
    const users = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'sys_role', 'sys_role.isDeleted = :isDeleted', { isDeleted: false })
      .select(['user', 'sys_role.id', 'sys_role.name', 'sys_role.value'])
      .where(where)
      .orderBy('user.createdAt', 'DESC')
      .skip(size * (page - 1))
      .take(size)
      .getManyAndCount()
    return ResultData.ok({ list: instanceToPlain(users[0]), total: users[1] })
  }

  /** 查询单个用户 */
  async findOne(id: string): Promise<ResultData> {
    const user = await this.findOneById(id)
    if (!user) return ResultData.fail(AppHttpCode.USER_NOT_FOUND, '该用户不存在或已删除')
    return ResultData.ok(instanceToPlain(user))
  }

  /**
   * 生成 token 与 刷新 token
   * @param payload
   * @returns
   */
  genToken(payload: { id: string }): CreateTokenDto {
    const accessToken = `Bearer ${this.jwtService.sign(payload)}`
    const refreshToken = this.jwtService.sign(payload, { expiresIn: this.config.get('jwt.refreshExpiresIn') })
    return { accessToken, refreshToken }
  }

  /**
   * 生成刷新 token
   */
  refreshToken(id: string): string {
    return this.jwtService.sign({ id })
  }

  /** 校验 token */
  verifyToken(token: string): string {
    try {
      if (!token) return null
      const id = this.jwtService.verify(token.replace('Bearer ', ''))
      return id
    } catch (error) {
      return null
    }
  }

  async delete(dto, user: UserEntity): Promise<ResultData> {
    const { id, ...opt } = dto
    const existing = await this.userRepo.findOne({ where: { id, isDeleted: false } })
    if (!existing) return ResultData.fail(AppHttpCode.USER_NOT_FOUND, '当前用户不存在或已被删除')
    const { affected } = await this.userManager.transaction(async (transactionalEntityManager) => {
      // 删除 user - role 关系
      // await transactionalEntityManager.delete(UserRoleEntity, { roleId: id })
      const result = await transactionalEntityManager.update<UserEntity>(
        UserEntity,
        id,
        plainToInstance(UserEntity, { ...opt, isDeleted: true }),
      )
      return result
    })
    if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '删除失败，请稍后重试')
    // 删除角色后，角色不存在 影响用户权限，和用户绑定角色，所以需要全删
    await this.permService.clearUserInfoCache()
    return ResultData.ok()
  }

  async findMenuByUserId(user: UserEntity) {
    const { id, isSystem } = user
    // 如果是超管, 则查询全部
    if (isSystem === UserType.SUPER_ADMIN) {
      return this.menuervice.findAllMenu({})
    }
    const result = await this.userRepo
      .createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .leftJoin('role.menus', 'menu')
      .where('user.id = :id', { id })
      .andWhere('menu.isDeleted = :isDeleted and menu.type != 3', { isDeleted: false })
      .select('DISTINCT menu.*')
      .getRawMany()
    return ResultData.ok(result)
  }

  async getUserInfo(userid: string) {
    let user = await this.userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'sys_role', 'sys_role.isDeleted = :isDeleted', { isDeleted: false })
      .leftJoinAndSelect('sys_role.menus', 'sys_menu', 'sys_menu.isDeleted = :isDeleted', { isDeleted: false })
      .where('user.id = :id', { id: userid })
      .select(['user', 'sys_role.id', 'sys_role.name', 'sys_role.value', 'sys_menu.permission'])
      .getOne()

    // 整合并去重所有角色的菜单集合
    const allMenus = user.roles.reduce((result, item) => {
      const permissions = item.menus.map((i) => i.permission);
      result = [...result, ...permissions];
      return result;
    }, [])
    const result = instanceToPlain(user)
    result.permissions = Array.from(new Set(allMenus));

    result.password = ''
    result.salt = ''
    return ResultData.ok(result)
  }

  async logout(userid: string) {
    return ResultData.ok()
  }
}
