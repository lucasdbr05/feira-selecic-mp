import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FairService } from './fair.service';
import { CreateFairDto } from './dto/create-fair.dto';
import { UpdateFairDto } from './dto/update-fair.dto';
import { Public } from '../auth/decorators';

@Controller('fair')
export class FairController {
  constructor(private readonly fairService: FairService) {}

  @Post()
  async create(@Body() createFairDto: CreateFairDto) {
    return await this.fairService.create(createFairDto);
  }

  @Get()
  @Public()
  async findAll() {
    return await this.fairService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.fairService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateFairDto,
  ) {
    return await this.fairService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.fairService.remove(+id);
  }
}
