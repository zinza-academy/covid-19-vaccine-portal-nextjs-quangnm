import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatalocationsService } from './datalocations.service';
import { CreateDatalocationDto } from './dto/create-datalocation.dto';
import { UpdateDatalocationDto } from './dto/update-datalocation.dto';

@Controller('datalocations')
export class DatalocationsController {
  constructor(private readonly datalocationsService: DatalocationsService) {}

  @Post()
  create(@Body() createDatalocationDto: CreateDatalocationDto) {
    return this.datalocationsService.create(createDatalocationDto);
  }

  @Get()
  findAll() {
    return this.datalocationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datalocationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatalocationDto: UpdateDatalocationDto) {
    return this.datalocationsService.update(+id, updateDatalocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datalocationsService.remove(+id);
  }
}
