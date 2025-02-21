import {
  Controller,
  Query,
  Get,
  Param,
  Put,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  Req,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserService } from './user.service'
import { UserEntity } from './user.entity'
import { ResultData } from '../../common/utils/result'
import { ApiResult } from '../../common/decorators/api-result.decorator'
import { FindUserListDto } from './dto/find-user-list.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateOrUpdateRoleUsersDto } from './dto/createupdate-role-users.dto'
import { UpdateInterceptor } from 'src/common/guards/update.interceptor'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('用户账号')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async create(@Body() dto: CreateUserDto): Promise<ResultData> {
    return await this.userService.create(dto)
  }

  @Get('list')
  @ApiOperation({ summary: '查询用户列表' })
  @ApiResult(UserEntity, true, true)
  async findList(@Query() dto: FindUserListDto, @Req() req): Promise<ResultData> {
    return await this.userService.findList(dto, req.user.id)
  }

  @Get('one/info')
  @ApiOperation({ summary: '根据id查询用户信息' })
  @ApiQuery({ name: 'id' })
  @ApiResult(UserEntity)
  async findOne(@Query('id') id: string, @Req() req): Promise<ResultData> {
    return await this.userService.findOne(id || req.user.id)
  }

  // @Get(':id/role')
  // @ApiOperation({ summary: '查询用户角色id集合' })
  // @ApiResult(String, true)
  // async findUserRole(@Param('id') id: string): Promise<ResultData> {
  //   return await this.userRoleService.findUserRole(id)
  // }

  // @Post('role/update')
  // @ApiOperation({ summary: '角色添加/取消关联用户' })
  // @ApiResult()
  // async createOrCancelUserRole(@Body() dto: CreateOrUpdateRoleUsersDto, @Req() req): Promise<ResultData> {
  //   return await this.userRoleService.createOrCancelUserRole(dto.userIds, dto.roleId, dto.type, req.user.id)
  // }

  @Put()
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async update(@Body() dto: UpdateUserDto, @Req() req): Promise<ResultData> {
    return await this.userService.update(dto, req.user)
  }

  @Put('/password/reset')
  @ApiOperation({ summary: '重置用户密码' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async resetPassword(@Body('userId') userId: string, @Req() req): Promise<ResultData> {
    return await this.userService.updatePassword(userId, '', true, req.user)
  }

  // @Post('/import')
  // @ApiOperation({ summary: 'excel 批量导入用户' })
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @HttpCode(200)
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiResult(UserEntity, true)
  // async importUsers(@UploadedFile() file: Express.Multer.File): Promise<ResultData> {
  //   return await this.userService.importUsers(file)
  // }

  @Delete()
  @UseInterceptors(UpdateInterceptor)
  @ApiOperation({ summary: '删除用户' })
  @ApiResult()
  async delete(@Body() body, @Req() req): Promise<ResultData> {
    return await this.userService.delete(body, req)
  }

  @Get('/menus')
  @ApiOperation({ summary: '根据用户Id获取所有菜单' })
  @ApiResult(UserEntity, true)
  async findMenuForRole(@Req() req): Promise<ResultData> {
    return await this.userService.findMenuByUserId(req.user)
  }
}
