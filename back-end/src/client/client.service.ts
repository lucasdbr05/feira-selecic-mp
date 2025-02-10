import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import {
  PrismaService,
  PrismaServiceTransaction,
} from '../prisma/prisma.service';
import { GeocodeService } from '../geocode/geocode.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geocodingService: GeocodeService,
  ) {}

  async create(
    data: CreateClientDto,
    prismaTransaction: PrismaServiceTransaction = this.prisma,
  ) {
    const location = await this.geocodingService
      .geocode(data.cep)
      .then((res) => res.results[0]);

    return await prismaTransaction.client.create({
      data: {
        ...data,
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng,
      },
    });
  }

  async findAll() {
    return await this.prisma.client.findMany();
  }
}
