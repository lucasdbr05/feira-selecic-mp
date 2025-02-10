import { Injectable } from '@nestjs/common';
import { CreateFairDto } from './dto/create-fair.dto';
import { UpdateFairDto } from './dto/update-fair.dto';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodeService } from '../geocode/geocode.service';

@Injectable()
export class FairService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geocodingService: GeocodeService,
  ) {}

  async create(data: CreateFairDto) {
    const location = await this.geocodingService
      .geocode(data.cep)
      .then((res) => res.results[0]);
    return await this.prisma.fair.create({
      data: {
        ...data,
        latitude: location.geometry.location.lat,
        longitude: location.geometry.location.lng,
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
