import { ApiProperty } from '@nestjs/swagger'
import { $enum } from 'ts-enum-util'

import { StatusValue } from '../../../common/enums/common.enum'
import { ReqListQuery } from '../../../common/utils/req-list-query'

export class FindUserListDto extends ReqListQuery {
  @ApiProperty({ description: '账号模糊搜索', required: false })
  account?: string

  @ApiProperty({ description: '昵称模糊搜索', required: false })
  nickname?: string

  @ApiProperty({ description: '手机号码模糊搜索', required: false })
  phoneNum?: string

  @ApiProperty({ description: '邮箱模糊搜索', required: false })
  email?: string

  @ApiProperty({ description: '开始时间', required: false })
  startDate?: Date

  @ApiProperty({ description: '开始时间', required: false })
  endDate?: Date

  @ApiProperty({ description: '按账号状态查询用户, 1-有效, 0-禁用', enum: $enum(StatusValue).getValues(), required: false })
  status?: StatusValue
}
