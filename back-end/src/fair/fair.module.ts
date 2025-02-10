import { Module } from '@nestjs/common';
import { FairService } from './fair.service';
import { FairController } from './fair.controller';
import { GeocodeModule } from '../geocode/geocode.module';

@Module({
  imports: [GeocodeModule],
  controllers: [FairController],
  providers: [FairService],
})
export class FairModule {}
