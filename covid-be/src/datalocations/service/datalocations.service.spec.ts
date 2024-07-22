import { Test, TestingModule } from '@nestjs/testing';
import { DatalocationsService } from './datalocations.service';

describe('DatalocationsService', () => {
  let service: DatalocationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatalocationsService],
    }).compile();

    service = module.get<DatalocationsService>(DatalocationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
