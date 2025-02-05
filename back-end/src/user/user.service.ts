import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserWithRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { AdminService } from '../admin/admin.service';
import { SellerService } from '../seller/seller.service';
import { ClientService } from '../client/client.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly adminService: AdminService,
    private readonly sellerService: SellerService,
    private readonly clientService: ClientService,
  ) {}

  async create(data: CreateUserWithRole) {
    const userData: CreateUserDto = {
      email: data.email,
      name: data.email,
      nickname: data.nickname,
      password: data.password,
      role: data.role,
    };
    return this.prisma.$transaction(async (prismaTransaction) => {
      const user = await prismaTransaction.user
        .create({
          data: userData,
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
        await this.sellerService.create({ id: user.id }, prismaTransaction);
      } else if (user.role == Role.CLIENT) {
        await this.clientService.create(
          {
            id: user.id,
            cep: data.client.cep,
          },
          prismaTransaction,
        );
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
