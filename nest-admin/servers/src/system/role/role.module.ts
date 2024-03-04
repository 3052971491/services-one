import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermModule } from '../perm/perm.module'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { RoleEntity } from './role.entity'
import { UserEntity } from '../user/user.entity'
import { MenuEntity } from '../menu/menu.entity'
import { PermEntity } from '../perm/perm.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, MenuEntity, PermEntity]), PermModule],
  providers: [
    RoleService,
  ],
  controllers: [RoleController],
})
export class RoleModule {}
