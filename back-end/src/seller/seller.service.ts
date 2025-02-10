import { Injectable } from '@nestjs/common';
import { CreateFullSellerDto, CreateSellerDto } from './dto/create-seller.dto';
import {
  PrismaService,
  PrismaServiceTransaction,
} from '../prisma/prisma.service';
import { ShopService } from '../shop/shop.service';

@Injectable()
export class SellerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly shopService: ShopService,
  ) {}

  async create(
    data: CreateFullSellerDto,
    prismaTransaction: PrismaServiceTransaction = this.prisma,
  ) {
    const sellerData: CreateSellerDto = {
      id: data.id,
    };
    const seller = await prismaTransaction.seller.create({
      data: sellerData,
    });

    await this.shopService.create(
      {
        name: data.shop.name,
        categories: {}, // TODO: define what categories will be
        fairId: data.shop.fairId,
        isOpen: true,
        sellerId: seller.id,
      },
      prismaTransaction,
    );

    return seller;
  }

  async findAll() {
    return await this.prisma.seller.findMany({
      include: {
        user: true,
      },
    });
  }
}
