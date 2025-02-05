import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserWithRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { mock, mockReset } from 'jest-mock-extended';
import { UserEntity } from './entities/user.entity';
import { TestUtils } from '../commom/utils/test-utils';
import { AdminService } from '../admin/admin.service';
import { ClientService } from '../client/client.service';
import { SellerService } from '../seller/seller.service';
import { Role } from '@prisma/client';
import { AdminEntity } from '../admin/entities/admin.entity';
import { ClientEntity } from '../client/entities/client.entity';
import { SellerEntity } from '../seller/entities/seller.entity';

describe('UserService', () => {
  let service: UserService;

  const prismaServiceMock = mock({
    $transaction: jest.fn(),
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  });
  const adminServiceMock = mock<AdminService>();
  const clientServiceMock = mock<ClientService>();
  const sellerServiceMock = mock<SellerService>();

  beforeEach(async () => {
    mockReset(prismaServiceMock);
    jest.restoreAllMocks();
    prismaServiceMock.$transaction.mockImplementation((cb) =>
      cb(prismaServiceMock),
    );
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaServiceMock },
        { provide: AdminService, useValue: adminServiceMock },
        { provide: ClientService, useValue: clientServiceMock },
        { provide: SellerService, useValue: sellerServiceMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let user: UserEntity & {
      admin: AdminEntity;
      client: ClientEntity;
      seller: SellerEntity;
    };
    let userRes: Partial<UserEntity>;
    let createUserDto: CreateUserWithRole;
    beforeEach(() => {
      const newUser = TestUtils.genUser();
      user = {
        ...newUser,
        admin: { id: newUser.id },
        seller: { id: newUser.id },
        client: {
          id: newUser.id,
          cep: '72880558',
          latitude: '0.00',
          longitude: '0.00',
        },
      };
      userRes = {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password,
        nickname: user.nickname,
        role: user.role,
      };
      createUserDto = {
        email: newUser.email,
        name: newUser.name,
        nickname: newUser.name,
        password: newUser.password,
        role: Role.ADMIN,
      };
      adminServiceMock.create.mockResolvedValue(user);
      sellerServiceMock.create.mockResolvedValue(user);
      clientServiceMock.create.mockResolvedValue(user.client);
      prismaServiceMock.user.create.mockResolvedValue(userRes);
    });

    it('should create a new user', async () => {
      const result = await service.create(createUserDto);
      expect(result).toEqual(userRes);
      expect(prismaServiceMock.user.create).toHaveBeenCalledWith(
        {
          data: createUserDto,
        },
        prismaServiceMock,
      );
    });

    it('should create a admin if user role is admin', async () => {
      await service.create({
        ...createUserDto,
        role: Role.ADMIN,
      });
      expect(adminServiceMock.create).toHaveBeenCalledWith(
        {
          id: user.id,
        },
        prismaServiceMock,
      );
    });

    it('should create a seller if user role is seller', async () => {
      await service.create({
        ...createUserDto,
        role: Role.SELLER,
        client: undefined,
      });
      expect(sellerServiceMock.create).toHaveBeenCalledWith({
        id: user.id,
      });
    });

    it('should create a client if user role is client', async () => {
      await service.create({
        ...createUserDto,
        role: Role.CLIENT,
        client: user.client,
      });

      expect(clientServiceMock.create).toHaveBeenCalledWith({
        id: user.id,
        cep: '72880558',
      });
    });
  });

  describe('findAll', () => {
    let users: UserEntity[];
    beforeEach(() => {
      users = [TestUtils.genUser(), TestUtils.genUser(), TestUtils.genUser()];
      prismaServiceMock.user.findMany.mockResolvedValue(users);
    });

    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(prismaServiceMock.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    let user: UserEntity;
    beforeEach(() => {
      user = TestUtils.genUser();
      prismaServiceMock.user.findUnique.mockResolvedValue(user);
    });
    it('should return a single user', async () => {
      const result = await service.findOne(user.id);
      expect(result).toEqual(user);
      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: user.id },
      });
    });
  });

  describe('update', () => {
    let user: UserEntity;
    beforeEach(() => {
      user = TestUtils.genUser();
      user.email = 'updated@example.com';
      prismaServiceMock.user.update.mockResolvedValue(user);
    });

    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { email: 'updated@example.com' };

      const result = await service.update(user.id, updateUserDto);

      expect(result).toEqual(user);
      expect(prismaServiceMock.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: updateUserDto,
      });
    });
  });

  describe('remove', () => {
    let user: UserEntity;
    beforeEach(() => {
      user = TestUtils.genUser();
      prismaServiceMock.user.delete.mockResolvedValue(user);
    });

    it('should remove a user', async () => {
      const result = await service.remove(user.id);
      expect(result).toEqual(user);
      expect(prismaServiceMock.user.delete).toHaveBeenCalledWith({
        where: { id: user.id },
      });
    });
  });
});
