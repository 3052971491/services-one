import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateOssDto {
  @ApiProperty({ description: '文件名称' })
  @IsString({ message: 'name 类型错误，正确类型 string' })
  @IsOptional()
  name?: string

  @ApiProperty({ type: 'string', description: '文件: 上传文件描述, 可以是纯字符串, 也可以是JSON字符串', format: 'binary' })
  file: Express.Multer.File

  @ApiProperty({ description: '角色备注', required: false })
  @IsString({ message: 'remark 类型错误, 正确类型 string' })
  @Length(0, 100, { message: 'remark 字符长度在 0~100' })
  @IsOptional()
  remark?: string
}
