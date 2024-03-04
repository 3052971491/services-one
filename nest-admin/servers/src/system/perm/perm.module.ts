import { Module } from '@nestjs/common'
import { PermService } from './perm.service'
import { PermController } from './perm.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermEntity } from './perm.entity'
import { RoleEntity } from '../role/role.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PermEntity, RoleEntity])],
  providers: [
    PermService,
  ],
  controllers: [PermController],
exports: [PermService]})
export class PermModule {}
