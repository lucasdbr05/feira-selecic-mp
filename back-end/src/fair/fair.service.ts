import { Injectable } from '@nestjs/common';
import { CreateFairDto } from './dto/create-fair.dto';
import { UpdateFairDto } from './dto/update-fair.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FairService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFairDto) {
    return await this.prisma.fair.create({
      data: {
        ...data,
        latitude: 0,
        longitude: 0,
      },
    });
  }

  async findAll() {
    return await this.prisma.fair.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.fair.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateFairDto) {
    return await this.prisma.fair.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    return await this.prisma.fair.delete({
      where: { id },
    });
  }
}
