import { Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import {
  PrismaService,
  PrismaServiceTransaction,
} from '../prisma/prisma.service';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateShopDto,
    prismaTransaction: PrismaServiceTransaction = this.prisma,
  ) {
    return await prismaTransaction.shop.create({
      data: data,
    });
  }

  async findAll() {
    return await this.prisma.shop.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateShopDto) {
    return await this.prisma.shop.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    return await this.prisma.shop.delete({
      where: { id },
    });
  }
}
