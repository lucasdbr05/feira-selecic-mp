import { Role } from '@prisma/client';

export type JwtPayload = {
  email: string;
  sub: number;
  role: Role;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };

export type Tokens = {
  access_token: string;
  refresh_token: string;
};
