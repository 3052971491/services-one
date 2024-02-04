import { ApiProperty } from '@nestjs/swagger'

export class FindMenuListDto {
  @ApiProperty({ description: '名称模糊搜索', required: false })
  name?: string

  @ApiProperty({ description: '菜单(不包含按钮)', required: false })
  hasBtn?: boolean
}
