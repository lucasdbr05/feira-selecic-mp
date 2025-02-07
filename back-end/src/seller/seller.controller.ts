import { Controller, Get, Post, Body } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateFullSellerDto } from './dto/create-seller.dto';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  create(@Body() createSellerDto: CreateFullSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }
}
