import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateRoleDto {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: string

  @ApiProperty({ description: '角色名称', required: false })
  @IsString({ message: 'remark 类型错误, 正确类型 string' })
  @Length(2, 20, { message: 'name 字符长度在 2~20' })
  @IsOptional()
  name?: string

  @ApiProperty({ description: '角色值', required: false })
  @IsString({ message: 'value 类型错误, 正确类型 string' })
  @IsOptional()
  @Length(2, 20, { message: 'value 字符长度在 2~20' })
  value?: string

  @ApiProperty({ description: '角色备注', required: false })
  @IsString({ message: 'remark 类型错误, 正确类型 string' })
  @Length(0, 100, { message: 'name 字符长度在 0~100' })
  @IsOptional()
  remark?: string

  @ApiProperty({ description: '菜单 id 集合', required: false })
  @IsString( { each: true, message: '菜单id集合中存在类型错误，正确类型 string[]' })
  @IsOptional()
  readonly menus?: string[]

  @ApiProperty({ description: 'api id 集合', required: false })
  @IsString( { each: true, message: '接口id集合中存在类型错误，正确类型 string[]' })
  @IsOptional()
  readonly apis?: string[]
}
