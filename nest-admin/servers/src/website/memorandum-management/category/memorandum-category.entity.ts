import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CommonEntity } from '../../../entities/common.entity'
import { MemorandumEntity } from '../memorandum/memorandum.entity'

@Entity('website_memorandum_category')
export class MemorandumCategoryEntity extends CommonEntity{

  @ApiProperty({ type: String, description: '名称' })
  @Column({ type: 'varchar', length: 32, comment: '名称' })
  public name: string

  @ApiProperty({ description: '描述' })
  @Column({ type: 'varchar', length: 200, default: '', comment: '描述' })
  public description: string

  // @ManyToMany(() => MemorandumEntity, i=> i.categories)
  // @JoinTable()
  // memorandums: MemorandumEntity[];
}
