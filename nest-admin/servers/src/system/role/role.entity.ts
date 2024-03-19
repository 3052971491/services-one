import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { RoleType } from '../../common/enums/common.enum'
import { $enum } from 'ts-enum-util'
import { CommonEntity } from '../../entities/common.entity'
import { UserEntity } from '../user/user.entity'
import { MenuEntity } from '../menu/menu.entity'
import { PermEntity } from '../perm/perm.entity'

@Entity('sys_role')
export class RoleEntity extends CommonEntity {

  @ApiProperty({ description: '角色名称' })
  @Column({ type: 'varchar', length: 100, comment: '角色名称' })
  name: string

  @ApiProperty({ description: '角色值' })
  @Column({ type: 'varchar', length: 100, comment: '角色值' })
  value: string

  @ApiProperty({ type: Number, description: '帐号类型: 0-超管， 1-普通用户', enum: $enum(RoleType).getValues() })
  @Column({ type: 'tinyint', default: RoleType.ORDINARY_ROLE, comment: '帐号类型: 0-超管， 1-普通用户' })
  public isSystem: RoleType

  @ApiProperty({ description: '角色备注' })
  @Column({ type: 'varchar', length: 100, default: '', comment: '角色备注' })
  remark: string

  @ManyToMany(() => UserEntity, (user) => user.id)
  @JoinTable()
  users: UserEntity[];

  @ManyToMany(() => MenuEntity, menu => menu.roles)
  @JoinTable()
  menus: MenuEntity[];

  @ManyToMany(() => PermEntity, perm => perm.roles)
  @JoinTable()
  apis: PermEntity[];
}
