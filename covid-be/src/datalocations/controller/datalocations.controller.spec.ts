import { Test, TestingModule } from '@nestjs/testing';
import { DatalocationsController } from './datalocations.controller';
import { DatalocationsService } from './datalocations.service';

describe('DatalocationsController', () => {
  let controller: DatalocationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatalocationsController],
      providers: [DatalocationsService],
    }).compile();

    controller = module.get<DatalocationsController>(DatalocationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
