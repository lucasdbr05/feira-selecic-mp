import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adminService: AdminService,
  ) {}

  async create(data: CreateUserDto) {
    return this.prisma.$transaction(async (prismaTransaction) => {
      const user = await prismaTransaction.user
        .create({
          data: data,
        })
        .catch((error) => {
          if (error?.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
          throw error;
        });

      if (user.role == Role.ADMIN) {
        await this.adminService.create({ id: user.id }, prismaTransaction);
      } else if (user.role == Role.SELLER) {
      } else if (user.role == Role.CLIENT) {
      }
      return user;
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }

  async getRole(id: number): Promise<Role> {
    return await this.prisma.user
      .findUnique({
        where: { id: id },
      })
      .then((res) => res.role);
  }
}
