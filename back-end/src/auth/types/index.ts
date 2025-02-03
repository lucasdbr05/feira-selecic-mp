export type JwtPayload = {
  email: string;
  sub: number;
};

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
