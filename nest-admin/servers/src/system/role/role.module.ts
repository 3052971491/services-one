import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermModule } from '../perm/perm.module'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { RoleEntity } from './role.entity'
import { UserEntity } from '../user/user.entity'
import { MenuEntity } from '../menu/menu.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, MenuEntity]), PermModule],
  providers: [
    RoleService,
  ],
  controllers: [RoleController],
})
export class RoleModule {}
