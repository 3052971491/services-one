import { Controller, Get, Post, UploadedFile, UseInterceptors, Query, HttpCode, Body, Req } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { MemorandumService } from './memorandum.service'

@ApiTags('备忘录类型')
@ApiBearerAuth()
@Controller('memorandum')
export class MemorandumController {
  constructor(private readonly service: MemorandumService) {}

}
