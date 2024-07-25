import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsOptional, IsNotEmpty } from 'class-validator'
import { ReqListQuery } from 'src/common/utils/req-list-query'
import { ReqQuery } from 'src/common/utils/req-query'

export class AddMemorandumCategoryDto extends ReqQuery {
  @ApiProperty({ description: '名称' })
  @IsString({ message: 'name 类型错误, 正确类型 string' })
  @IsNotEmpty({ message: 'name 不能为空' })
  @Length(0, 20, { message: 'name 字符长度在 0~20' })
  name: string

  @ApiProperty({ description: '角色备注', required: false })
  @IsString({ message: 'description 类型错误, 正确类型 string' })
  @Length(0, 200, { message: 'description 字符长度在 0~200' })
  @IsOptional()
  description?: string
}

export class UpdateMemorandumCategoryDto extends AddMemorandumCategoryDto {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: string
}

export class DeleteMemorandumCategoryDto extends ReqQuery {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: string
}

export class FindPageDto extends ReqListQuery {

  @ApiProperty({ description: '昵称模糊搜索', required: false })
  name?: string

  @ApiProperty({ description: '开始时间', required: false })
  startDate?: Date

  @ApiProperty({ description: '开始时间', required: false })
  endDate?: Date
}

export class FindListDto {

  @ApiProperty({ description: '昵称模糊搜索', required: false })
  name?: string

  @ApiProperty({ description: '开始时间', required: false })
  startDate?: Date

  @ApiProperty({ description: '开始时间', required: false })
  endDate?: Date
}
