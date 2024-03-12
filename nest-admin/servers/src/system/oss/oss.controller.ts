import { Controller, Get, Post, UploadedFile, UseInterceptors, Query, HttpCode, Body, Req } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger'

import { ResultData } from '../../common/utils/result'

import { OssService } from './oss.service'
import { FindOssDto } from './dto/find-oss.dto'
import { ApiResult } from '../../common/decorators/api-result.decorator'
import { OssEntity } from './oss.entity'
import { CreateOssDto } from './dto/create-oss.dto'

@ApiTags('文件存储')
@ApiBearerAuth()
@Controller('oss')
export class OssController {
  constructor(private readonly ossService: OssService) {}

  @Get()
  @ApiOperation({ summary: '查询文件上传列表' })
  @ApiResult(OssEntity, true, true)
  async findList(@Query() search: FindOssDto): Promise<ResultData> {
    return await this.ossService.findList(search)
  }

  @Post()
  @ApiOperation({ summary: '文件上传, 返回 url 地址' })
  @ApiConsumes('multipart/form-data')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @ApiResult()
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: CreateOssDto,
    @Req() req,
  ): Promise<ResultData> {
    return await this.ossService.create([file], params, req.user)
  }
}
