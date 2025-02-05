import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards/at.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { SellerModule } from './seller/seller.module';
import { ClientModule } from './client/client.module';
import { FairModule } from './fair/fair.module';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,
    AdminModule,
    SellerModule,
    ClientModule,
    FairModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: AtGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
