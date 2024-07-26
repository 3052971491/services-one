import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { Between, EntityManager, In, Like, Not, Repository } from 'typeorm'
import { ResultData } from 'src/common/utils/result'
import { AppHttpCode } from 'src/common/enums/code.enum'
import { plainToInstance } from 'class-transformer'
import { MemorandumEntity } from './memorandum.entity'
import {
  AddMemorandumDto,
  DeleteMemorandumDto,
  FindPageDto,
  SetStickPost,
  UpdateMemorandumDto,
} from './dto/memorandum.dto'
import { MemorandumCategoryEntity } from '../category/memorandum-category.entity'
import { StatusValue2 } from 'src/common/enums/common.enum'

@Injectable()
export class MemorandumService {
  constructor(
    @InjectEntityManager()
    private readonly manager: EntityManager,
    @InjectRepository(MemorandumEntity)
    private readonly repository: Repository<MemorandumEntity>,
    @InjectRepository(MemorandumCategoryEntity)
    private readonly categoryRepository: Repository<MemorandumCategoryEntity>,
  ) {}

  /**
   * # 添加一条新的数据
   * @param data 保存的数据
   */
  async add(data: AddMemorandumDto): Promise<ResultData> {
    try {
      const __data__ = plainToInstance(MemorandumEntity, data)
      const result = await this.manager.transaction(async (transactionalEntityManager) => {
        const o = await this.categoryRepository.findBy({ id: In(__data__.categories) })
        __data__.categories = o
        return await transactionalEntityManager.save<MemorandumEntity>(__data__)
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
  async delete(dto: DeleteMemorandumDto) {
    try {
      const existing = await this.getDetail(dto.id)
      if (!existing) return ResultData.fail(AppHttpCode.ROLE_NOT_FOUND, '备忘录不存在或已被删除')

      const { affected } = await this.manager.transaction(async (transactionalEntityManager) => {
        const __data__ = plainToInstance(MemorandumEntity, {
          ...dto,
          isDeleted: true,
        })
        return await transactionalEntityManager.update<MemorandumEntity>(MemorandumEntity, __data__.id, __data__)
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
  async update(data: UpdateMemorandumDto): Promise<ResultData> {
    try {
      const existing = await this.getDetail(data.id)
      if (!existing) return ResultData.fail(AppHttpCode.ROLE_NOT_FOUND, '备忘录不存在或已被删除')
      const affected = await this.manager.transaction(async (transactionalEntityManager) => {
        const __data__ = plainToInstance(MemorandumEntity, data)
        const o = await this.categoryRepository.findBy({ id: In(__data__.categories) })
        __data__.categories = o
        return await transactionalEntityManager.save<MemorandumEntity>(__data__)
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
      ...(name ? { name: Like(`%${name}%`) } : null),
      isDeleted: false,
    }
    if (dto.startDate && dto.endDate) {
      where.createdAt = Between(dto.startDate, dto.endDate)
    }

    const queryBuilder = this.repository
      .createQueryBuilder('memorandum')
      .leftJoinAndSelect('memorandum.categories', 'category', 'category.isDeleted = false')
      .select(['memorandum.id', 'category.id', 'category.name'])
      .addSelect(['memorandum.name', 'memorandum.stickyPost', 'memorandum.createdAt'])
      .andWhere(where)
      .orderBy('memorandum.createdAt', 'DESC')
      .skip(size * (page - 1))
      .take(size)

    const excludedIds = dto.categories || []
    if (excludedIds.length > 0) {
      queryBuilder
        .andWhere((qb) => {
          const subQuery = qb
            .subQuery()
            .select('id')
            .from('website_memorandum_category', 'ec')
            .where('ec.id IN (:...excludedIds)')
            .getQuery()
          return `category.id IN ${subQuery}`
        })
        .setParameters({ excludedIds })
    }
    const [list, total] = await queryBuilder.getManyAndCount()
    return ResultData.ok({ list, total })
  }

  async getDetail2(id: string) {
    const res = await this.getDetail(id)
    return ResultData.ok(res)
  }

  /**
   * ## 获取详情对象
   * @param id ID
   * @param name 名称
   * @param exclude 是否排除当前id
   */
  async getDetail(id: string = null, name: string = null, exclude = false): Promise<MemorandumEntity> {
    let queryBuilder = this.repository
      .createQueryBuilder('memorandum')
      .innerJoinAndSelect('memorandum.categories', 'category')
      .where({
        isDeleted: false,
      })

    if (name !== null) {
      queryBuilder = queryBuilder.andWhere('memorandum.name = :name', { name })
    }

    if (id !== null) {
      queryBuilder = queryBuilder.where({
        id: exclude ? Not(id) : id,
      })
    }
    const r = await queryBuilder.getMany()
    return r.length > 0 ? r[0] : null
  }

  /**
   * ## 设置置顶文章
   * 1、相同分类只拥有一个置顶;2、每一个分类可拥有一个置顶;
   * @description 如果设置成功, 取消原有文章置顶
   */
  async setStickPost(dto: SetStickPost): Promise<ResultData> {
    const { id, stickyPost, ...r } = dto
    try {
      const existing = await this.getDetail(id)
      if (!existing) return ResultData.fail(AppHttpCode.ROLE_NOT_FOUND, '备忘录不存在或已被删除')
      const affected = await this.manager.transaction(async (transactionalEntityManager) => {
        const o = existing.categories
        const __data__ = plainToInstance(MemorandumEntity, dto)
        if (stickyPost === StatusValue2.NO || o.length <= 0) {
          return await transactionalEntityManager.update<MemorandumEntity>(MemorandumEntity, __data__.id, __data__)
        }
        // 正常情况, 长度最大为1
        const post = await this.getCurrentCategoryStickPost(id, o[0].id)
        if (post) {
          const saveStickPostParams = {
            id: post.id,
            stickyPost: StatusValue2.NO,
            ...r,
          }
          const p = plainToInstance(MemorandumEntity, saveStickPostParams)
          // 原有备忘录取消置顶
          await transactionalEntityManager.update<MemorandumEntity>(MemorandumEntity, p.id, p)
        }
        // 最新备忘录置顶
        return await transactionalEntityManager.update<MemorandumEntity>(MemorandumEntity, __data__.id, __data__)
      })
      if (!affected) return ResultData.fail(AppHttpCode.SERVICE_ERROR, '更新失败, 请稍后重试')
      return ResultData.ok(true)
    } catch (error) {
      return ResultData.fail(AppHttpCode.SERVICE_ERROR, '发生错误, 请稍后重试')
    }
  }

  /**
   * ## 获取当前分类文章中的置顶文章
   * @param id
   * @param categoryId
   */
  async getCurrentCategoryStickPost(id: string, categoryId: string) {
    try {
      let memorandums = await this.repository
        .createQueryBuilder('memorandum')
        .innerJoinAndSelect('memorandum.categories', 'category')
        .where({
          stickyPost: StatusValue2.YES,
          isDeleted: false,
          id: Not(id)
        })
        .andWhere(`category.id = :categoryId`, { categoryId })
        .getOne()
      return memorandums || null
    } catch (error) {
      throw new Error(`获取分类 ${categoryId} 中的置顶文章失败：${error.message}`)
    }
  }
}
