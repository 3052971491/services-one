import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'

import { ResultData } from '../../common/utils/result'
import { AllowAnon } from '../../common/decorators/allow-anon.decorator'
import { ApiResult } from '../../common/decorators/api-result.decorator'

import { UserEntity } from './user.entity'
import { UserService } from './user.service'

import { LoginUser } from './dto/login-user.dto'
import { CreateTokenDto } from './dto/create-token.dto'
import { RegisterUserDto } from './dto/register-user.dto'

@ApiTags('登录注册')
@Controller()
export class BaseController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResult(String)
  @AllowAnon()
  async create(@Body() user: RegisterUserDto): Promise<ResultData> {
    return await this.userService.register(user)
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResult(CreateTokenDto)
  @AllowAnon()
  async login(@Body() dto: LoginUser): Promise<ResultData> {
    return await this.userService.login(dto.account, dto.password)
  }

  @Post('/update/token')
  @ApiOperation({ summary: '刷新token' })
  @ApiResult(CreateTokenDto)
  @ApiBearerAuth()
  async updateToken(@Req() req): Promise<ResultData> {
    return await this.userService.updateToken(req.user.id)
  }

  @Get('getUserInfo')
  @ApiOperation({ summary: '根据token获取用户信息' })
  @ApiResult(UserEntity)
  @ApiBearerAuth()
  async getUserInfo(@Req() req): Promise<ResultData> {
    return await this.userService.getUserInfo(req.user.id)
  }

  @Get('logout')
  @ApiOperation({ summary: '注销' })
  @ApiResult()
  @ApiBearerAuth()
  async logout(@Req() req): Promise<ResultData> {
    return await this.userService.logout(req.user.id)
  }
}
