import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import {
  PrismaService,
  PrismaServiceTransaction,
} from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateAdminDto,
    prismaTransaction: PrismaServiceTransaction = this.prisma,
  ) {
    return await prismaTransaction.admin.create({
      data: data,
    });
  }

  async findAll() {
    return await this.prisma.admin.findMany();
  }
}
