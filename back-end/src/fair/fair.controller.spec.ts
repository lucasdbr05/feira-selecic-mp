import { Test, TestingModule } from '@nestjs/testing';
import { FairController } from './fair.controller';
import { FairService } from './fair.service';

describe('FairController', () => {
  let controller: FairController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FairController],
      providers: [FairService],
    }).compile();

    controller = module.get<FairController>(FairController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
