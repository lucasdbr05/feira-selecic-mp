import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './guards';
import { RolesGuard } from './guards/roles.guard';
import { mock } from 'jest-mock-extended';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let controller: AuthController;

  const service = mock<AuthService>();
  const usersServiceMock = mock<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [AuthController],
      providers: [
        AtStrategy,
        RtStrategy,
        { provide: APP_GUARD, useClass: AtGuard },
        { provide: APP_GUARD, useClass: RolesGuard },
        { provide: AuthService, useValue: service },
        { provide: UserService, useValue: usersServiceMock },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
