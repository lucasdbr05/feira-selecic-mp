import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin')
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() createAdminDto: CreateAdminDto) {
    return await this.adminService.create(createAdminDto);
  }

  @Get()
  async findAll() {
    return await this.adminService.findAll();
  }
}
