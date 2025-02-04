import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FairService } from './fair.service';
import { CreateFairDto } from './dto/create-fair.dto';
import { UpdateFairDto } from './dto/update-fair.dto';

@Controller('fair')
export class FairController {
  constructor(private readonly fairService: FairService) {}

  @Post()
  create(@Body() createFairDto: CreateFairDto) {
    return this.fairService.create(createFairDto);
  }

  @Get()
  findAll() {
    return this.fairService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fairService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateFairDto,
  ) {
    return this.fairService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fairService.remove(+id);
  }
}
