import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Public, GetUser, GetUserId } from './decorators';
import { RtGuard } from './guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() data: CreateUserDto): Promise<Tokens> {
    return await this.authService.signup(data);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Res({ passthrough: true }) res: Response,
    @Body() data: AuthDto,
  ): Promise<Tokens> {
    const tokens = await this.authService.signin(data);
    this.authService.setAuthCookies(res, tokens);

    return tokens;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
    @GetUserId() userId: number,
  ): Promise<string> {
    const message = await this.authService.logout(userId);
    this.authService.clearAuthCookies(res);
    return message;
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Res({ passthrough: true }) res: Response,
    @GetUserId() userId: number,
    @GetUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);
    this.authService.setAuthCookies(res, tokens);
    return tokens;
  }
}
