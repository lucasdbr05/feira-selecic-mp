import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return await this.prisma.product.create({
      data: data,
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateProductDto) {
    return await this.prisma.product.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
