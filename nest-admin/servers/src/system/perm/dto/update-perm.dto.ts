import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { CreatePermDto } from './create-perm.dto'

export class UpdatePermDto extends CreatePermDto {
  @ApiProperty({ description: 'id' })
  @IsString({ message: 'id 类型错误，正确类型 number' })
  @IsNotEmpty({ message: 'id 不能为空' })
  id: string
}
