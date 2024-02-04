import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsIn, IsNumber, IsString, Min, IsNotEmpty, Length, IsNumberString, IsOptional } from 'class-validator';
import { $enum } from 'ts-enum-util'

import { MenuType, StatusValue } from '../../../common/enums/common.enum'

import { MenuPermDto } from './menu-perm.dto'

export class UpdateMenuDto {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 string' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: string

  @ApiProperty({ description: '菜单类型 1-菜单/目录 2-tabs 3-按钮', enum: $enum(MenuType).getValues(), required: false })
  @IsNumber({}, { message: 'type 类型错误' })
  @IsIn($enum(MenuType).getValues(), { message: 'type 的值只能是 1/2/3，且分别表示菜单/tabs/按钮' })
  readonly type: MenuType

  @ApiProperty({ description: '父级菜单' })
  @IsString({ message: 'parentId 类型错误' })
  @IsOptional()
  readonly parentId: string

  @ApiProperty({ description: '菜单名称' })
  @IsString()
  @Length(2, 20, { message: 'name 字符长度在 2~20' })
  readonly name: string

  @ApiProperty({ description: '排序', required: false })
  @IsNumber({}, { message: '排序传值错误' })
  @Min(0)
  readonly orderNum: number

  @ApiProperty({ description: '图标' })
  @IsString({ message: 'icon 类型错误，正确类型 string' })
  @IsOptional()
  readonly icon: string

  @ApiProperty({ description: '路由地址' })
  @IsString()
  @Length(0, 120, { message: 'routePath 字符长度在 0~34' })
  @IsOptional()
  readonly routePath: string

  @ApiProperty({ description: '状态, 1-启用 0-禁用', enum: $enum(StatusValue).getValues(), required: false })
  @IsNumber({}, { message: 'status 类型错误' })
  @IsIn($enum(StatusValue).getValues(), { message: '状态, 1-启用 0-禁用' })
  readonly status: StatusValue

  @ApiProperty({ description: '权限标识' })
  @IsString()
  @Length(0, 128, { message: 'permission 字符长度在 0~128' })
  @IsOptional()
  readonly permission: string

  @ApiProperty({ description: '组件路径' })
  @IsString()
  @Length(0, 256, { message: 'componentPath 字符长度在 0~256' })
  @IsOptional()
  readonly componentPath: string
}
