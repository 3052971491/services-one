import { Controller, Get, Post, UseInterceptors, Query, Body, Delete, Put } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { ResultData } from 'src/common/utils/result'
import { UpdateInterceptor } from 'src/common/guards/update.interceptor'
import { ApiResult } from 'src/common/decorators/api-result.decorator'

import { AddMemorandumCategoryDto, DeleteMemorandumCategoryDto, FindListDto, FindPageDto, UpdateMemorandumCategoryDto } from './dto/memorandum-category.dto'
import { MemorandumCategoryEntity } from './memorandum-category.entity'
import { MemorandumCategoryService } from './memorandum-category.service'

@ApiTags('备忘录类型')
@ApiBearerAuth()
@Controller('memorandum-category')
export class MemorandumCategoryController {
  constructor(private readonly service: MemorandumCategoryService) {}

  @Post()
  @ApiOperation({ summary: '新增' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async create(@Body() dto: AddMemorandumCategoryDto): Promise<ResultData> {
    return await this.service.add(dto)
  }

  @Delete()
  @ApiOperation({ summary: '删除' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async delete(@Body() dto: DeleteMemorandumCategoryDto): Promise<ResultData> {
    return await this.service.delete(dto)
  }

  @Put()
  @ApiOperation({ summary: '更新' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async update(@Body() dto: UpdateMemorandumCategoryDto): Promise<ResultData> {
    return await this.service.update(dto)
  }

  @Get('getPage')
  @ApiOperation({ summary: '查询分页数据列表' })
  @ApiResult(MemorandumCategoryEntity, true, true)
  async getPage(@Query() dto: FindPageDto): Promise<ResultData> {
    return await this.service.getPage(dto)
  }

  @Get('getList')
  @ApiOperation({ summary: '查询不分页数据列表' })
  @ApiResult(MemorandumCategoryEntity, true, true)
  async getList(@Query() dto: FindListDto): Promise<ResultData> {
    return await this.service.getList(dto)
  }
}
