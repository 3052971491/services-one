import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthModule } from '../auth/auth.module'
import { PermModule } from '../perm/perm.module'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { BaseController } from './base.controller'
import { UserController } from './user.controller'
import { RoleEntity } from 'src/system/role/role.entity'
import { MenuEntity } from '../menu/menu.entity'
import { MenuService } from '../menu/menu.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity, MenuEntity]),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretkey'),
        signOptions: {
          expiresIn: config.get('jwt.expiresin'),
        },
      }),
      inject: [ConfigService],
    }),
    PermModule,
  ],
  providers: [UserService, MenuService],
  controllers: [BaseController, UserController],
  exports: [UserService],
})
export class UserModule {}
