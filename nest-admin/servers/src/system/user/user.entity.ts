import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { $enum } from 'ts-enum-util'

import { UserType, StatusValue } from '../../common/enums/common.enum'
import { CommonEntity } from '../../entities/common.entity'
import { RoleEntity } from '../role/role.entity'

@Entity('sys_user')
export class UserEntity extends CommonEntity{

  @Exclude({ toPlainOnly: true }) // 输出屏蔽密码
  @Column({ type: 'varchar', length: 200, nullable: false, comment: '用户登录密码' })
  public password: string

  @Exclude({ toPlainOnly: true }) // 输出屏蔽盐
  @Column({ type: 'varchar', length: 200, nullable: false, comment: '盐' })
  public salt: string

  @ApiProperty({ type: String, description: '用户登录账号' })
  @Column({ type: 'varchar', length: 32, comment: '用户登录账号' })
  public account: string

  @ApiProperty({ type: String, description: '手机号' })
  @Column({ type: 'varchar', name: 'phone_num', default: '', length: 20, comment: '用户手机号码' })
  public phoneNum: string

  @ApiProperty({ type: String, description: '邮箱' })
  @Column({ type: 'varchar', comment: '邮箱地址', default: '' })
  public email: string

  @ApiProperty({ type: String, description: '所属状态: 1-有效: 0-禁用', enum: $enum(StatusValue).getValues() })
  @Column({ type: 'tinyint', default: StatusValue.NORMAL, comment: '所属状态: 1-有效: 0-禁用' })
  public status: StatusValue

  @ApiProperty({ type: String, description: '昵称' })
  @Column({ type: 'varchar', default: '', length: 32, comment: '昵称' })
  public nickname: string

  @ApiProperty({ type: String, description: '头像url' })
  @Column({ type: 'varchar', default: '', comment: '头像地址' })
  public avatar: string

  @ApiProperty({ description: '用户备注' })
  @Column({ type: 'varchar', length: 100, default: '', comment: '用户备注' })
  remark: string

  @ApiProperty({ type: Number, description: '帐号类型: 0-超管， 1-普通用户', enum: $enum(UserType).getValues() })
  @Column({ type: 'tinyint', default: UserType.ORDINARY_USER, comment: '帐号类型: 0-超管， 1-普通用户' })
  public isSystem: UserType

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
