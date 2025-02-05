import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export type PrismaTransactionType = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export type PrismaServiceTransaction = PrismaService | PrismaTransactionType;

export type PrismaTransactionConfig = Parameters<
  typeof PrismaClient.prototype.$transaction
>[1];

export const PrismaDefaultTransactionConfig: PrismaTransactionConfig = {
  maxWait: 30 * 1000,
  timeout: 60 * 1000,
};

@Injectable()
export class PrismaService extends PrismaClient {}
