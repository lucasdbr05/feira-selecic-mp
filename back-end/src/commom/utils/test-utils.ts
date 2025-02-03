import { faker } from '@faker-js/faker/.';
import { UserEntity } from '../../user/entities/user.entity';
import { Role } from '@prisma/client';

const genUser = (): UserEntity => {
  return {
    email: faker.internet.email(),
    id: faker.number.int(),
    name: faker.string.alpha(),
    nickname: faker.string.alpha(),
    password: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    role: faker.helpers.arrayElement(Object.values(Role)),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
};

export const TestUtils = {
  genUser,
};
