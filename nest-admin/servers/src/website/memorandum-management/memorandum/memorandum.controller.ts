import { Controller, Get, Post, UseInterceptors, Query, Body, Delete, Put } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { ResultData } from 'src/common/utils/result'
import { UpdateInterceptor } from 'src/common/guards/update.interceptor'
import { ApiResult } from 'src/common/decorators/api-result.decorator'

import { MemorandumService } from './memorandum.service'
import { AddMemorandumDto, DeleteMemorandumDto, FindListDto, FindPageDto, SetStickPost, UpdateMemorandumDto } from './dto/memorandum.dto'
import { MemorandumEntity } from './memorandum.entity'

@ApiTags('备忘录')
@ApiBearerAuth()
@Controller('memorandum')
export class MemorandumController {
  constructor(private readonly service: MemorandumService) {}

  @Post()
  @ApiOperation({ summary: '新增' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async create(@Body() dto: AddMemorandumDto): Promise<ResultData> {
    return await this.service.add(dto)
  }

  @Delete()
  @ApiOperation({ summary: '删除' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async delete(@Body() dto: DeleteMemorandumDto): Promise<ResultData> {
    return await this.service.delete(dto)
  }

  @Put()
  @ApiOperation({ summary: '更新' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async update(@Body() dto: UpdateMemorandumDto): Promise<ResultData> {
    return await this.service.update(dto)
  }

  @Get('getPage')
  @ApiOperation({ summary: '查询分页数据列表' })
  @ApiResult(MemorandumEntity, true, true)
  async getPage(@Query() dto: FindPageDto): Promise<ResultData> {
    return await this.service.getPage(dto)
  }

  @Put('setStickPost')
  @ApiOperation({ summary: '置顶文章' })
  @ApiResult()
  @UseInterceptors(UpdateInterceptor)
  async setStickPost(@Body() dto: SetStickPost): Promise<ResultData> {
    return await this.service.setStickPost(dto)
  }

  @Get('getDetail')
  @ApiOperation({ summary: '查询分页数据列表' })
  @ApiResult(MemorandumEntity, true, true)
  async getDetail(@Query() dto: DeleteMemorandumDto): Promise<ResultData> {
    return await this.service.getDetail2(dto.id)
  }
}
