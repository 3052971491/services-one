import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length, IsOptional, IsNotEmpty, IsNumber, IsIn } from 'class-validator'
import { PermType } from 'src/common/enums/common.enum'
import { RouterMethods } from 'src/common/enums/routerMethod.enum'
import { $enum } from 'ts-enum-util'

export class CreatePermDto {
  @ApiProperty({ description: '类型, 1-组 2-接口', enum: $enum(PermType).getValues(), required: true })
  @IsNumber({}, { message: 'status 类型错误，正确类型 number' })
  @IsIn($enum(PermType).getValues(), { message: 'type 的值只能是 1/2，且分别表示组/接口' })
  readonly type: PermType

  @ApiProperty({ description: '组id' })
  @IsString({ message: 'parentId 类型错误' })
  @IsOptional()
  readonly parentId: string

  @ApiProperty({ description: '名称', required: true })
  @IsString({ message: 'name 类型错误, 正确类型 string' })
  @IsNotEmpty({ message: 'name 不能为空' })
  readonly name: string

  @ApiProperty({ description: '路由方法', enum: $enum(RouterMethods).getValues() })
  @IsString({ message: 'method 类型错误，正确类型 string' })
  @IsIn($enum(RouterMethods).getValues(), { message: 'method 的值只能是 GET/POST/PUT/DELETE，且分别表示组/接口' })
  @IsOptional()
  readonly method?: RouterMethods

  @ApiProperty({ description: 'api 路径', required: false })
  @IsString({ message: 'remark 类型错误, 正确类型 string' })
  @Length(0, 100, { message: 'path 字符长度在 0~100' })
  @IsOptional()
  readonly path?: string

  @ApiProperty({ description: '备注', required: false })
  @IsString({ message: 'remark 类型错误, 正确类型 string' })
  @Length(0, 100, { message: 'remark 字符长度在 0~100' })
  @IsOptional()
  readonly remark?: string
}
