import { Injectable } from '@nestjs/common'
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm'
import { Repository, EntityManager, DataSource, Like, Between, Not } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { AppHttpCode } from '../../common/enums/code.enum'
import { UserType } from '../../common/enums/common.enum'
import { ResultData } from '../../common/utils/result'
import { RoleEntity } from './role.entity'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { UserEntity } from '../user/user.entity'
import { PermService } from '../perm/perm.service'
import { FindRoleListDto } from './dto/find-role-list.dto'
import { MenuEntity } from '../menu/menu.entity'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectEntityManager()
    private readonly roleManager: EntityManager,
    @InjectRepository(MenuEntity)
    private readonly menuRepo: Repository<MenuEntity>,
    private readonly dataSource: DataSource,
    private readonly permService: PermService,
  ) {}

  async create(dto: CreateRoleDto, user: UserEntity): Promise<ResultData> {
    if (await this.roleRepo.findOne({ where: { name: dto.name, isDeleted: false } }))
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '角色名称已存在，请调整后重新提交！')
    if (await this.roleRepo.findOne({ where: { value: dto.value, isDeleted: false } }))
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '角色值已存在，请调整后重新提交')
    const role = plainToInstance(RoleEntity, dto)
    const res = await this.roleManager.transaction(async (transactionalEntityManager) => {
      const result = await transactionalEntityManager.save<RoleEntity>(plainToInstance(RoleEntity, role))
      if (result) {
        // const roleMenus = plainToInstance(
        //   RoleMenuEntity,
        //   dto.menuIds.map((menuId) => {
        //     return { menuId, roleId: result.id }
        //   }),
        // )
        // await transactionalEntityManager.save<RoleMenuEntity>(roleMenus)
        // if (user.isSystem === UserType.ORDINARY_USER) {
        //   // 如果是 一般用户，则需要将 他创建的角色绑定他自身， 超管用户因为可以查看所有角色，则不需要绑定
        //   const userRole = { userId: user.id, roleId: result.id }
        //   await transactionalEntityManager.save<UserRoleEntity>(plainToInstance(UserRoleEntity, userRole))
        // }
      }
      return result
    })
    if (!res) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '角色创建失败，请稍后重试')
    return ResultData.ok(res)
  }

  async update(dto: UpdateRoleDto, user: UserEntity): Promise<ResultData> {
    const existing = await this.roleRepo.findOne({ where: { id: dto.id, isDeleted: false } })
    if (!existing) return ResultData.fail(AppHttpCode.ROLE_NOT_FOUND, '当前角色不存在或已被删除')
    if (dto.name && (await this.roleRepo.findOne({ where: { id: Not(dto.id), name: dto.name, isDeleted: false } })))
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '角色名称已存在，请调整后重新提交！')
    if (dto.value && (await this.roleRepo.findOne({ where: { id: Not(dto.id), value: dto.value, isDeleted: false } })))
      return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '角色值已存在，请调整后重新提交')
    const { affected } = await this.roleManager.transaction(async (transactionalEntityManager) => {
      const { apis, menus, ...params } = dto;
      const role = plainToInstance(RoleEntity, params);
      await this.createOrUpdateRoleMenu({ id: dto.id, menus, apis }, transactionalEntityManager)
      return await transactionalEntityManager.update<RoleEntity>(RoleEntity, dto.id, { ...role })
    })
    if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '当前角色更新失败，请稍后尝试')
    // 更新角色，redis 因为角色还在，只需要更新用户菜单，用户接口权
    await this.permService.clearUserInfoCache('nest:user:[menu|perm]*')
    return ResultData.ok()
  }

  async delete(dto, user: UserEntity): Promise<ResultData> {
    const { id, ...opt } = dto
    const existing = await this.roleRepo.findOne({ where: { id, isDeleted: false } })
    if (!existing) return ResultData.fail(AppHttpCode.ROLE_NOT_FOUND, '当前角色不存在或已被删除')
    const usersWithRole = await this.userRepo
      .createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .where('user.isDeleted = false and role.id = :id', { id })
      .getCount()
    if (usersWithRole > 0)
      return ResultData.fail(AppHttpCode.ROLE_NOT_DEL, '当前角色还有绑定的用户，需要解除关联后删除')
    const { affected } = await this.roleManager.transaction(async (transactionalEntityManager) => {
      // 删除 role - menu 关系
      // await transactionalEntityManager.delete(RoleMenuEntity, { roleId: id })
      // 删除 user - role 关系
      // await transactionalEntityManager.delete(UserRoleEntity, { roleId: id })
      const result = await transactionalEntityManager.update<RoleEntity>(
        RoleEntity,
        id,
        plainToInstance(RoleEntity, { ...opt, isDeleted: true }),
      )
      return result
    })
    if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '删除失败，请稍后重试')
    // 删除角色后，角色不存在 影响用户权限，和用户绑定角色，所以需要全删
    await this.permService.clearUserInfoCache()
    return ResultData.ok()
  }

  // async findOnePerm(id: string): Promise<ResultData> {
  //   const roleMenu = await this.roleMenuRepo.find({ select: ['menuId'], where: { roleId: id } })
  //   return ResultData.ok(roleMenu.map((v) => v.menuId))
  // }

  async findList(type: UserType, userId: string, params: FindRoleListDto): Promise<ResultData> {
    let roleData = []
    if (type === UserType.SUPER_ADMIN) {
      const { name } = params
      const where: any = {
        ...(name ? { name: Like(`%${name}%`) } : null),
        isDeleted: false,
      }
      if (params.startDate && params.endDate) {
        // 添加创建时间范围条件
        where.createdAt = Between(params.startDate, params.endDate)
      }
      roleData =  await this.roleRepo
        .createQueryBuilder('role')
        .leftJoinAndSelect('role.menus', 'sys_menu', 'sys_menu.isDeleted = :isDeleted', { isDeleted: false })
        .select(['role', 'sys_menu.id', 'sys_menu.name'])
        .where(where)
        .orderBy('role.createdAt', 'DESC')
        .getMany();
    } else {
      roleData = await this.roleRepo
        .createQueryBuilder('role')
        .leftJoinAndSelect('role.menus', 'sys_menu', 'sys_menu.isDeleted = :isDeleted', { isDeleted: false })
        .select(['role', 'sys_menu.id', 'sys_menu.name'])
        .where('sur.user_id = :userId', { userId })
        .orderBy('role.createdAt', 'DESC')
        .getMany()
    }
    return ResultData.ok(roleData)
  }

  async findByIds(roleIds: string[]): Promise<RoleEntity[]> {
    const roles = await this.roleRepo
      .createQueryBuilder('role')
      .where('role.id IN (:...roleIds)', { roleIds })
      .getMany()

    return roles
  }

  /** 创建 or 更新角色-菜单 */
  async createOrUpdateRoleMenu(dto: UpdateRoleDto, entityManager: EntityManager): Promise<ResultData> {
    let role = await entityManager.findOne(RoleEntity, { where: { id: dto.id }, relations: ['menus'] });
    if (!role) {
      role = new RoleEntity();
      role.id = dto.id;
    }
    if (role) {
      const menus = await this.menuRepo.findByIds(dto.menus);
      role.menus = menus;
    }
    const res = await entityManager.save(role)
    if (!res) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '角色更新菜单失败')
    return ResultData.ok()
  }
}
