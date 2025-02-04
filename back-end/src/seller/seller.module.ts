import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';

@Module({
  controllers: [SellerController],
  providers: [SellerService],
})
export class SellerModule {}
