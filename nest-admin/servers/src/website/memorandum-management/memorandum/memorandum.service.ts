import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MemorandumEntity } from './memorandum.entity'

@Injectable()
export class MemorandumService {

  constructor(
    @InjectRepository(MemorandumEntity)
    private readonly repository: Repository<MemorandumEntity>,
  ) {}

  
}
