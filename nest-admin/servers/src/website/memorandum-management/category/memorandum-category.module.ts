import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MemorandumCategoryController } from './memorandum-category.controller'
import { MemorandumCategoryEntity } from './memorandum-category.entity'
import { MemorandumCategoryService } from "./memorandum-category.service"

@Module({
  imports: [TypeOrmModule.forFeature([MemorandumCategoryEntity])],
  providers: [MemorandumCategoryService],
  controllers: [MemorandumCategoryController]
})

export class MemorandumCategoryModule {}
