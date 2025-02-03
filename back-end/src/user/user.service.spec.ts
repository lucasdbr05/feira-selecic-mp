import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { mock, mockReset } from 'jest-mock-extended';
import { UserEntity } from './entities/user.entity';
import { TestUtils } from '../commom/utils/test-utils';

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

  beforeEach(async () => {
    mockReset(prismaServiceMock);
    jest.restoreAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    let user: UserEntity;
    let createUserDto: CreateUserDto;
    beforeEach(() => {
      user = TestUtils.genUser();
      createUserDto = {
        ...user,
      };
      prismaServiceMock.user.create.mockResolvedValue(user);
    });

    it('should create a new user', async () => {
      const result = await service.create(createUserDto);
      expect(result).toEqual(user);
      expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
        data: createUserDto,
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
