import { Module } from '@nestjs/common';
import { FairService } from './fair.service';
import { FairController } from './fair.controller';

@Module({
  controllers: [FairController],
  providers: [FairService],
})
export class FairModule {}
