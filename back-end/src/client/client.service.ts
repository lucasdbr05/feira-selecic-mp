import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import {
  PrismaService,
  PrismaServiceTransaction,
} from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreateClientDto,
    prismaTransaction: PrismaServiceTransaction = this.prisma,
  ) {
    return await prismaTransaction.client.create({
      data: {
        ...data,
        latitude: '0.000',
        longitude: '0.000',
      },
    });
  }

  async findAll() {
    return await this.prisma.client.findMany();
  }
}
