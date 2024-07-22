import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { VaccinationSiteService } from '../service/vaccination_site.service';
import { VaccinationSiteDto } from '../dto/vaccination_site.dto';
import { UpdateVaccinationSiteDto } from '../dto/update_vaccin_site.dto';
import { VaccinationSite } from 'src/entity/vaccination_site.entty';
import { plainToInstance } from 'class-transformer';

@Controller('vaccination-sites')
export class VaccinationSitesController {
    constructor(private vaccinationSitesService: VaccinationSiteService) { }

    @Get()
    async getAll() {
        return await this.vaccinationSitesService.getAll();
    }

    @Get(':id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return this.vaccinationSitesService.getById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async create(@Body() createVaccinationSiteDto: VaccinationSiteDto): Promise<VaccinationSite> {
        return await this.vaccinationSitesService.create(createVaccinationSiteDto);
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateVaccinationSite: UpdateVaccinationSiteDto,
    ) {
        return this.vaccinationSitesService.update(id, updateVaccinationSite);
    }
}