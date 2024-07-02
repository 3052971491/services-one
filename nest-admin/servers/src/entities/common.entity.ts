import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

/**
 * 公共实体
 * @description 所有表通用的字段
 */
export class CommonEntity extends BaseEntity {
  /** 唯一标识 */
  @ApiProperty({ type: String, description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string

  /**
   * 标记记录是否被删除
   */
  @Column({ default: false, comment: '标记记录是否被删除' })
  isDeleted: boolean

  /**
   * 创建人
   * @description 记录创建条目的用户或管理员的信息
   */
  @Column({ nullable: true, comment: '创建人', type: 'uuid' })
  createdBy: string

  /**
   * 创建时间
   * @description 记录创建条目的时间
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  createdAt: Date

  /**
   * 更新人
   * @description 记录更新条目的用户或管理员的信息
   */
  @Column({ nullable: true, comment: '更新人', type: 'uuid' })
  updatedBy: string

  /**
   * 更新时间
   * @description 记录更新条目的
   */
  @Column({ nullable: true, comment: '更新时间' })
  updatedAt: Date

  /**
   * 删除人
   * @description 记录删除条目的用户或管理员的信息
   */
  @Column({ nullable: true, comment: '删除人', type: 'uuid' })
  deletedBy: string

  /** 记录删除时间 */
  @Column({ nullable: true , comment: '删除时间'})
  deletedAt: Date
}