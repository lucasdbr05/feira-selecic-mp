import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AtStrategy } from '../auth/strategies';
import { AtGuard } from '../auth/guards';
import { RolesGuard } from '../auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { mock } from 'jest-mock-extended';
import { ConfigModule } from '@nestjs/config';

describe('UserController', () => {
  let controller: UserController;
  const service = mock<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [UserController],
      providers: [
        AtStrategy,
        { provide: APP_GUARD, useClass: AtGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
        { provide: UserService, useValue: service },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
