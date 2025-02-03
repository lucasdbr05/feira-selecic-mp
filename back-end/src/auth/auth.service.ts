import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

import { AuthDto } from './dto/auth.dto';
import { JwtPayload, Tokens } from './types';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Role } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private readonly userService: UserService,
  ) {}

  private salt = 10;

  /**
   * Signs up a new user.
   *
   * @param data - The data for creating a new user.
   * @returns A promise that resolves to the tokens for the new user.
   * @throws ForbiddenException if the credentials are incorrect.
   */
  async signup(data: CreateUserDto): Promise<Tokens> {
    const hash = await bcrypt.hash(data.password, this.salt);

    const createUserData: CreateUserDto = {
      ...data,
      password: hash,
    };
    const user = await this.userService.create(createUserData);

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  /**
   * Signs in a user.
   *
   * @param dto - The authentication data transfer object.
   * @returns A promise that resolves to the tokens for the user.
   * @throws ForbiddenException if access is denied.
   */
  async signin(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  /**
   * Logs out a user.
   *
   * @param userId - The ID of the user to log out.
   * @returns A promise that resolves to a success message.
   */
  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
    return 'User logged out successfully';
  }

  /**
   * Refreshes the tokens for a user.
   *
   * @param userId - The ID of the user.
   * @param rt - The refresh token.
   * @returns A promise that resolves to the new tokens.
   * @throws ForbiddenException if access is denied.
   */
  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(user.refreshToken, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  /**
   * Updates the refresh token hash for a user.
   *
   * @param userId - The ID of the user.
   * @param rt - The refresh token.
   * @returns A promise that resolves when the hash is updated.
   */
  async updateRefreshToken(userId: number, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt, this.salt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
  }

  /**
   * Generates access and refresh tokens.
   *
   * @param userId - The ID of the user.
   * @param email - The email of the user.
   * @param role - The role of the user.
   * @returns A promise that resolves to the tokens.
   */
  async getTokens(userId: number, email: string, role: Role): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      id: userId,
      email: email,
      role: role,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
