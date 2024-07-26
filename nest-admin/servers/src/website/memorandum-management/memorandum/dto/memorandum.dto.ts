import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsOptional, IsNotEmpty, IsIn } from 'class-validator'
import { StatusValue2 } from 'src/common/enums/common.enum'
import { ReqListQuery } from 'src/common/utils/req-list-query'
import { ReqQuery } from 'src/common/utils/req-query'
import { $enum } from 'ts-enum-util'

export class AddMemorandumDto extends ReqQuery {
  @ApiProperty({ description: '标题' })
  @IsString({ message: 'name 类型错误, 正确类型 string' })
  @IsNotEmpty({ message: 'name 不能为空' })
  @Length(0, 100, { message: 'name 字符长度在 0~100' })
  readonly name: string

  @ApiProperty({ description: '内容' })
  @IsString({ message: 'content 类型错误, 正确类型 string' })
  @IsNotEmpty({ message: 'content 不能为空' })
  readonly content: string

  @ApiProperty({ description: '备忘录分类', required: false })
  @IsString( { each: true, message: 'id集合中存在类型错误, 正确类型 string[]' })
  @IsNotEmpty({ message: 'categories 不能为空' })
  readonly categories?: string[]
}

export class SetStickPost extends ReqQuery {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: string

  @ApiProperty({ description: '是否置顶 0-否 1-是', enum: $enum(StatusValue2).getValues() })
  @IsNotEmpty({ message: 'stickyPost 不能为空' })
  @IsIn($enum(StatusValue2).getValues(), { message: 'stickyPost 的值只能是 0/1' })
  readonly stickyPost: StatusValue2
}

export class UpdateMemorandumDto extends AddMemorandumDto {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: string
}

export class DeleteMemorandumDto extends ReqQuery {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: string
}

export class FindPageDto extends ReqListQuery {

  @ApiProperty({ description: '昵称模糊搜索', required: false })
  readonly name?: string

  @ApiProperty({ description: '开始时间', required: false })
  readonly startDate?: Date

  @ApiProperty({ description: '开始时间', required: false })
  readonly endDate?: Date

  @ApiProperty({ description: '备忘录分类', required: false })
  readonly categories?: string[]
}

export class FindListDto {

  @ApiProperty({ description: '昵称模糊搜索', required: false })
  name?: string

  @ApiProperty({ description: '开始时间', required: false })
  startDate?: Date

  @ApiProperty({ description: '开始时间', required: false })
  endDate?: Date

  @ApiProperty({ description: '备忘录分类', required: false })
  readonly categories?: string[]
}
