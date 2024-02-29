import { ApiProperty } from '@nestjs/swagger'
import { PermType } from 'src/common/enums/common.enum'
import { $enum } from 'ts-enum-util'

export class FindListByTypeDto {
  @ApiProperty({ description: '按类型查询权限', enum: $enum(PermType).getValues(), required: false })
  type?: PermType

  @ApiProperty({ description: '名称模糊搜索', required: false })
  name?: string

  @ApiProperty({ description: '开始时间', required: false })
  startDate?: Date

  @ApiProperty({ description: '开始时间', required: false })
  endDate?: Date
}
