import { faker } from '@faker-js/faker/.';
import { UserEntity } from '../../user/entities/user.entity';
import { Role } from '@prisma/client';

const genUser = (): UserEntity => {
  return {
    id: faker.number.int(),
    email: faker.internet.email(),
    name: faker.string.alpha(),
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
