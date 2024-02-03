import { ApiProperty } from '@nestjs/swagger'

import { ReqListQuery } from '../../../common/utils/req-list-query'

export class FindRoleListDto extends ReqListQuery {
  @ApiProperty({ description: '角色名称模糊搜索', required: false })
  name?: string

  @ApiProperty({ description: '开始时间', required: false })
  startDate?: Date

  @ApiProperty({ description: '开始时间', required: false })
  endDate?: Date
}
