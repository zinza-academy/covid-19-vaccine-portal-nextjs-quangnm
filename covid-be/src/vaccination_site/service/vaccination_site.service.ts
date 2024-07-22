import { Injectable, UnauthorizedException } from '@nestjs/common';
import { VaccinationSite } from 'src/entity/vaccination_site.entty';
import { Repository } from 'typeorm';
import { VaccinationSiteDto } from '../dto/vaccination_site.dto';
import { UpdateVaccinationSiteDto } from '../dto/update_vaccin_site.dto';

@Injectable()
export class VaccinationSiteService {
    constructor(
        private readonly vaccinationSiteRepository: Repository<VaccinationSite>,
    ) { }

    async create(newVaccinationSiteDto: VaccinationSiteDto) {
        const res = this.vaccinationSiteRepository.create(newVaccinationSiteDto);
        return await this.vaccinationSiteRepository.save(res);
    }

    async update(id: number, resVaccinationSiteUpdate: UpdateVaccinationSiteDto){
        await this.vaccinationSiteRepository.update({ id }, resVaccinationSiteUpdate);
        return await this.vaccinationSiteRepository.find({ where: {id} });
    }

    async getAll() {
        return await this.vaccinationSiteRepository.find({
            relations: ['ward', 'ward.district', 'ward.district.city'],
        });
    }

    async getById(id: number) {
        const site = await this.vaccinationSiteRepository.find({
            where: { id },
            relations: ['ward', 'ward.district', 'ward.district.province'],
        });
        if (site) {
            return site;
        } else {
            return new UnauthorizedException('Site is not exist', '404');
        }
    }
}
