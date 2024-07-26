import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { CommonEntity } from 'src/entities/common.entity'
import { $enum } from 'ts-enum-util'
import { StatusValue2 } from 'src/common/enums/common.enum'
import { MemorandumCategoryEntity } from '../category/memorandum-category.entity'

@Entity('website_memorandum')
export class MemorandumEntity extends CommonEntity {
  @ApiProperty({ type: String, description: '标题' })
  @Column({ type: 'varchar', default: '', length: 100, comment: '标题' })
  public name: string

  @ApiProperty({ type: String, description: '置顶: 1-是: 0-否', enum: $enum(StatusValue2).getValues() })
  @Column({ type: 'tinyint', default: StatusValue2.NO, comment: '置顶: 1-是: 0-否' })
  public stickyPost: StatusValue2

  @ApiProperty({ description: '内容' })
  @Column({ type: 'text', comment: '内容' })
  public content: string

  @ManyToMany(() => MemorandumCategoryEntity, category => category.memorandums, { cascade: true })
  @JoinTable()
  categories: MemorandumCategoryEntity[];
}
