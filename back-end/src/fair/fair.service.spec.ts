import { Test, TestingModule } from '@nestjs/testing';
import { FairService } from './fair.service';

describe('FairService', () => {
  let service: FairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FairService],
    }).compile();

    service = module.get<FairService>(FairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
