import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mock, mockReset } from 'jest-mock-extended';
import { UserEntity } from './entities/user.entity';
import { TestUtils } from '../commom/utils/test-utils';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

describe('UserService', () => {
  let service: UserService;

  const prismaServiceMock = mock({
    $transaction: jest.fn(),
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      updateMany: jest.fn(),
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

  describe('getUserRole', () => {
    let user: UserEntity;
    let users: UserEntity[];
    let role: Role;
    beforeEach(async () => {
      user = TestUtils.genUser();
      role =
        Object.values(Role)[
          Math.floor(Math.random() * 100) % Object.values(Role).length
        ];
      user.role = role;
      users = [user, TestUtils.genUser(), TestUtils.genUser()];

      prismaServiceMock.user.findMany.mockResolvedValue(users);
      prismaServiceMock.user.findUnique.mockResolvedValue(user);
    });

    it('Should find user and return its role', async () => {
      const res = await service.getRole(user.id);

      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: { id: user.id },
      });
      expect(res).toEqual(role);
    });
  });
});
