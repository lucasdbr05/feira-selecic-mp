import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdminModule } from '../admin/admin.module';
import { SellerModule } from '../seller/seller.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [AdminModule, SellerModule, ClientModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
