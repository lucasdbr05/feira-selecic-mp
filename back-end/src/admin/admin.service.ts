import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateAdminDto) {
    return await this.prisma.admin.create({
      data: data,
    });
  }

  async findAll() {
    return await this.prisma.admin.findMany();
  }
}
