import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseInterceptors } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { ApiResult } from '../../common/decorators/api-result.decorator'
import { ResultData } from '../../common/utils/result'
import { MenuEntity } from '../menu/menu.entity'
import { PermService } from './perm.service'
import { UpdateInterceptor } from 'src/common/guards/update.interceptor'
import { CreatePermDto } from './dto/create-perm.dto'
import { UpdatePermDto } from './dto/update-perm.dto'
import { FindListByTypeDto } from './dto/find-perm-list.dto'

@ApiTags('权限路由')
@ApiBearerAuth()
@Controller('perm')
export class PermController {
  constructor(private readonly permService: PermService) {}

  @Get()
  @ApiOperation({ summary: '查询权限路由列表' })
  @ApiResult(MenuEntity, true)
  async findList(@Query() dto: FindListByTypeDto, @Req() req): Promise<ResultData> {
    return await this.permService.findList(dto, req.user)
  }

  // @Get('one/:id/perms')
  // @ApiOperation({ summary: '查询单个角色详情及权限菜单' })
  // @ApiResult(RoleEntity)
  // async findOne(@Param('id') id: string): Promise<ResultData> {
  //   return await this.roleService.findOnePerm(id)
  // }

  @Post()
  @UseInterceptors(UpdateInterceptor)
  @ApiOperation({ summary: '创建接口' })
  @ApiResult()
  async create(@Body() dto: CreatePermDto): Promise<ResultData> {
    return await this.permService.create(dto)
  }

  @Put()
  @UseInterceptors(UpdateInterceptor)
  @ApiOperation({ summary: '更新接口' })
  @ApiResult()
  async update(@Body() dto: UpdatePermDto): Promise<ResultData> {
    return await this.permService.update(dto)
  }

  @Delete()
  @UseInterceptors(UpdateInterceptor)
  @ApiOperation({ summary: '删除接口' })
  @ApiResult()
  async delete(@Body() body): Promise<ResultData> {
    return await this.permService.delete(body)
  }
  
}
