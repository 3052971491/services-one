import { ApiProperty } from '@nestjs/swagger'

export class ReqQuery {
  @ApiProperty({ description: '创建人' })
  createdBy?: string

  @ApiProperty({ description: '更新人' })
  updatedBy?: string

  @ApiProperty({ description: '更新时间' })
  updatedAt?: Date

  @ApiProperty({ description: '删除人' })
  deletedBy?: string

  @ApiProperty({ description: '删除时间' })
  deletedAt?: Date
}
