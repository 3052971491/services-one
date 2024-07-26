import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Between, EntityManager, Like, Not, Repository } from 'typeorm'
import { MemorandumCategoryEntity } from './memorandum-category.entity'
import {
  AddMemorandumCategoryDto,
  DeleteMemorandumCategoryDto,
  FindListDto,
  FindPageDto,
  UpdateMemorandumCategoryDto,
} from './dto/memorandum-category.dto'
import { ResultData } from 'src/common/utils/result'
import { AppHttpCode } from 'src/common/enums/code.enum'
import { plainToInstance } from 'class-transformer'
import { MemorandumService } from '../memorandum/memorandum.service'

@Injectable()
export class MemorandumCategoryService {
  constructor(
    @InjectRepository(MemorandumCategoryEntity)
    private readonly repository: Repository<MemorandumCategoryEntity>,
    @InjectEntityManager()
    private readonly manager: EntityManager,
    private readonly memorandumService: MemorandumService,
  ) {}

  /**
   * # 添加一条新的数据
   * @param data 保存的数据
   */
  async add(data: AddMemorandumCategoryDto): Promise<ResultData> {
    try {
      const existing = await this.getDetail(null, data.name)
      if (existing) {
        return ResultData.fail(AppHttpCode.SERVICE_ERROR, '名称已存在，请调整后重新提交！')
      }

      const __data__ = plainToInstance(MemorandumCategoryEntity, data)
      const result = await this.manager.transaction(async (transactionalEntityManager) => {
        return await transactionalEntityManager.save<MemorandumCategoryEntity>(__data__)
      })

      if (!result) {
        return ResultData.fail(AppHttpCode.SERVICE_ERROR, '创建失败, 请稍后重试')
      }

      return ResultData.ok(result)
    } catch (error) {
      return ResultData.fail(AppHttpCode.SERVICE_ERROR, '发生错误, 请稍后重试')
    }
  }

  /**
   * # 根据ID删除一条数据
   * @param dto
   */
  async delete(dto: DeleteMemorandumCategoryDto) {
    try {
      const existing = await this.getDetail(dto.id)
      if (!existing) return ResultData.fail(AppHttpCode.ROLE_NOT_FOUND, '当前分类不存在或已被删除')

      // 该分类存在备忘录数据, 则不允许被删除
      let o = await this.memorandumService.getPage({ size: 1, page: 1, categories: [dto.id] })
      if (o.data.total > 0)
        return ResultData.fail(AppHttpCode.ROLE_NOT_DEL, '当前分类还有绑定的备忘录，需要解除关联后删除')

      const { affected } = await this.manager.transaction(async (transactionalEntityManager) => {
        const __data__ = plainToInstance(MemorandumCategoryEntity, {
          ...dto,
          isDeleted: true,
        })
        return await transactionalEntityManager.update<MemorandumCategoryEntity>(
          MemorandumCategoryEntity,
          __data__.id,
          __data__,
        )
      })
      if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '删除失败, 请稍后重试')

      return ResultData.ok(affected)
    } catch (error) {
      return ResultData.fail(AppHttpCode.SERVICE_ERROR, '发生错误, 请稍后重试')
    }
  }

  /**
   * # 修改一条数据
   * @param data 修改的数据实体
   */
  async update(data: UpdateMemorandumCategoryDto): Promise<ResultData> {
    try {
      const existing = await this.getDetail(data.id)
      if (!existing) return ResultData.fail(AppHttpCode.ROLE_NOT_FOUND, '当前分类不存在或已被删除')
      if (data.name && (await this.getDetail(data.id, data.name, true)))
        return ResultData.fail(AppHttpCode.USER_CREATE_EXISTING, '名称已存在，请调整后重新提交！')

      const { affected } = await this.manager.transaction(async (transactionalEntityManager) => {
        const __data__ = plainToInstance(MemorandumCategoryEntity, data)
        return await transactionalEntityManager.update<MemorandumCategoryEntity>(
          MemorandumCategoryEntity,
          __data__.id,
          __data__,
        )
      })
      if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '更新失败, 请稍后重试')

      return ResultData.ok(affected)
    } catch (error) {
      return ResultData.fail(AppHttpCode.SERVICE_ERROR, '发生错误, 请稍后重试')
    }
  }

  /**
   * 查询分页数据列表
   */
  async getPage(dto: FindPageDto): Promise<ResultData> {
    const { page, size, name } = dto
    const where: any = {
      ...(name ? { account: Like(`%${name}%`) } : null),
      isDeleted: false,
    }
    if (dto.startDate && dto.endDate) {
      where.createdAt = Between(dto.startDate, dto.endDate)
    }
    const [list, total] = await this.repository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: size * (page - 1),
      take: size,
      where,
    })
    return ResultData.ok({ list, total })
  }

  /**
   * 查询不分页数据列表
   */
  async getList(dto: FindListDto): Promise<ResultData> {
    const { name } = dto
    const where: any = {
      ...(name ? { account: Like(`%${name}%`) } : null),
      isDeleted: false,
    }
    if (dto.startDate && dto.endDate) {
      where.createdAt = Between(dto.startDate, dto.endDate)
    }
    const list = await this.repository.find({
      select: ['id', 'name'],
      order: { createdAt: 'DESC' },
      where,
    })
     // 转换结果为 label 和 value 格式
     const transformedResults = list.map(item => ({
      label: item.name,
      value: item.id.toString(),
    }));
    return ResultData.ok(transformedResults)
  }

  /**
   * ## 获取详情对象
   * @param id ID
   * @param name 名称
   * @param exclude 是否排除当前id
   */
  async getDetail(id: string = null, name: string = null, exclude = false): Promise<MemorandumCategoryEntity> {
    let obj = {
      name: name || null,
      isDeleted: false,
      id: exclude ? Not(id || null) : (id || null),
    }
    return await this.repository.findOne({ where: obj })
  }
}
