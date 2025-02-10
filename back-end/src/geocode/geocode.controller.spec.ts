import { Test, TestingModule } from '@nestjs/testing';
import { GeocodeController } from './geocode.controller';
import { GeocodeService } from './geocode.service';

describe('GeocodeController', () => {
  let controller: GeocodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeocodeController],
      providers: [GeocodeService],
    }).compile();

    controller = module.get<GeocodeController>(GeocodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
