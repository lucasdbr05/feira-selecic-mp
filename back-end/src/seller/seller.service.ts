import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
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

  async findOne(id: number) {
    return await this.prisma.seller.findUnique({
      where: { id: id },
    });
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    return await this.prisma.seller.update({
      where: { id: id },
      data: updateSellerDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.seller.delete({
      where: { id: id },
    });
  }
}
