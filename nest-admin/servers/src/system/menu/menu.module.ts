import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermModule } from '../perm/perm.module'
import { MenuEntity } from './menu.entity'
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service'
import { RoleEntity } from '../role/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MenuEntity, RoleEntity]), PermModule],
  providers: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
