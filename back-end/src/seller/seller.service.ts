import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import {
  PrismaService,
  PrismaServiceTransaction,
} from '../prisma/prisma.service';

@Injectable()
export class SellerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateSellerDto,
    prismaTransaction: PrismaServiceTransaction = this.prisma,
  ) {
    return await prismaTransaction.seller.create({
      data: data,
    });
  }

  async findAll() {
    return await this.prisma.seller.findMany({
      include: {
        user: true,
      },
    });
  }
}
