import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MemorandumCategoryController } from './memorandum-category.controller'
import { MemorandumCategoryEntity } from './memorandum-category.entity'
import { MemorandumCategoryService } from "./memorandum-category.service"
import { MemorandumEntity } from "../memorandum/memorandum.entity"
import { MemorandumService } from "../memorandum/memorandum.service"

@Module({
  imports: [TypeOrmModule.forFeature([MemorandumCategoryEntity, MemorandumEntity])],
  providers: [MemorandumCategoryService, MemorandumService],
  controllers: [MemorandumCategoryController]
})

export class MemorandumCategoryModule {}
