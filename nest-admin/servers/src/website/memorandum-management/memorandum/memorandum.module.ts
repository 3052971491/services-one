import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MemorandumController } from './memorandum.controller'
import { MemorandumEntity } from './memorandum.entity'
import { MemorandumService } from "./memorandum.service"

@Module({
  imports: [TypeOrmModule.forFeature([MemorandumEntity])],
  providers: [MemorandumService],
  controllers: [MemorandumController]
})

export class MemorandumModule {}
