import { ApiProperty } from '@nestjs/swagger'
import { PermType } from 'src/common/enums/common.enum'
import { CommonEntity } from 'src/entities/common.entity'
import { $enum } from 'ts-enum-util'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { RoleEntity } from '../role/role.entity'
import { RouterMethods } from 'src/common/enums/routerMethod.enum'

@Entity('sys_perm')
export class PermEntity extends CommonEntity {
  @ApiProperty({ description: '类型, 1-组 2-接口', enum: $enum(PermType).getValues() })
  @Column({ type: 'int', default: PermType.API, comment: 'type 1-组 2-接口' })
  public type: PermType

  @ApiProperty({ description: '组id' })
  @Column({ name: 'parent_id', nullable: true, type: 'bigint' })
  public parentId: string

  @ApiProperty({ description: '名称' })
  @Column({ type: 'varchar', length: 30, comment: '名称' })
  public name: string

  @ApiProperty({ description: '路由方法', enum: $enum(RouterMethods).getValues() })
  @Column({ type: 'varchar', nullable: true, comment: '路由方法' })
  public method: RouterMethods

  @ApiProperty({ description: 'api 路径' })
  @Column({ type: 'varchar', length: 100, nullable: true, comment: 'api 路径' })
  path: string

  @ApiProperty({ description: '备注' })
  @Column({ type: 'varchar', length: 100, default: '', comment: '备注' })
  remark: string

  @ManyToMany(() => RoleEntity, (role) => role.perms)
  @JoinTable()
  roles: RoleEntity[];
}
