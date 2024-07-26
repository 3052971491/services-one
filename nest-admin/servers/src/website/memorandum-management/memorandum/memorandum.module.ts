import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MemorandumController } from './memorandum.controller'
import { MemorandumEntity } from './memorandum.entity'
import { MemorandumService } from "./memorandum.service"
import { MemorandumCategoryEntity } from "../category/memorandum-category.entity"

@Module({
  imports: [TypeOrmModule.forFeature([MemorandumEntity, MemorandumCategoryEntity])],
  providers: [MemorandumService],
  controllers: [MemorandumController]
})

export class MemorandumModule {}
