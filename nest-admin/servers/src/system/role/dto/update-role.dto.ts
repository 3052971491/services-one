import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateRoleDto {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: string

  @ApiProperty({ description: '角色名称' })
  @IsString({ message: 'remark 类型错误, 正确类型 string' })
  @Length(2, 20, { message: 'name 字符长度在 2~20' })
  name?: string

  @ApiProperty({ description: '角色值' })
  @IsString({ message: 'value 类型错误, 正确类型 string' })
  @IsNotEmpty({ message: 'value 不能为空' })
  @Length(2, 20, { message: 'value 字符长度在 2~20' })
  value: string

  @ApiProperty({ description: '角色备注', required: false })
  @IsString({ message: 'remark 类型错误, 正确类型 string' })
  @Length(0, 100, { message: 'name 字符长度在 0~100' })
  @IsOptional()
  remark?: string
}
