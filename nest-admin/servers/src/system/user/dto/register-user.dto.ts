import { ApiProperty } from '@nestjs/swagger'
import { IsMobilePhone, IsNotEmpty, IsString } from 'class-validator'

export class RegisterUserDto {

  @ApiProperty({ description: '密码', default: '123456' })
  @IsString({ message: 'password 类型错误，正确类型 string' })
  @IsNotEmpty({ message: 'password 不能为空' })
  password: string

  @ApiProperty({ description: '手机号', default: '15173886750' })
  @IsString({ message: 'phoneNum 类型错误，正确类型 string' })
  @IsMobilePhone('zh-CN', { strictMode: false }, { message: '请输入正确的手机号' })
  @IsNotEmpty({ message: 'phoneNum 不能为空' })
  readonly phoneNum: string

  @ApiProperty({ description: '确认密码', default: '123456' })
  @IsString({ message: ' confirmPassword 类型错误，正确类型 string' })
  readonly confirmPassword: string
}
