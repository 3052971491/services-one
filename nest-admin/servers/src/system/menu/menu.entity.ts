import { ApiProperty } from '@nestjs/swagger'
import { MenuType } from 'src/common/enums/common.enum'
import { CommonEntity } from 'src/entities/common.entity'
import { $enum } from 'ts-enum-util'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { RoleEntity } from '../role/role.entity'

@Entity('sys_menu')
export class MenuEntity extends CommonEntity {
  @ApiProperty({ description: '菜单类型, 1-菜单 2-tabs 3-按钮', enum: $enum(MenuType).getValues() })
  @Column({ type: 'int', default: MenuType.TAB, comment: 'type 1-菜单/目录 2-tabs 3-按钮' })
  public type: MenuType

  @ApiProperty({ description: '父级菜单id' })
  @Column({ name: 'parentId', nullable: true, type: 'uuid' })
  public parentId: string

  @ApiProperty({ description: '菜单名称' })
  @Column({ type: 'varchar', length: 30, comment: '菜单名称' })
  public name: string

  @ApiProperty({ description: '排序' })
  @Column({ name: 'orderNum', type: 'int', comment: '排序' })
  public orderNum: number

  @ApiProperty({ description: '图标' })
  @Column({ type: 'varchar', length: 128, nullable: true, comment: '图标' })
  public icon: string

  @ApiProperty({ description: '路由地址' })
  @Column({ type: 'varchar', length: 64, nullable: true, comment: '路由地址' })
  public routePath: string

  @ApiProperty({ description: '状态, 1-启用 0-禁用' })
  @Column({ type: 'int', default: 1, comment: '状态, 1-启用 0-禁用' })
  public status: 0 | 1

  @ApiProperty({ description: '权限标识' })
  @Column({ type: 'varchar', length: 128, nullable: true, comment: '权限标识' })
  public permission: string

  @ApiProperty({ description: '组件路径' })
  @Column({ type: 'varchar', length: 256, nullable: true, comment: '组件路径' })
  public componentPath: string

  @ManyToMany(() => RoleEntity, (role) => role.id)
  @JoinTable()
  roles: RoleEntity[]
}
