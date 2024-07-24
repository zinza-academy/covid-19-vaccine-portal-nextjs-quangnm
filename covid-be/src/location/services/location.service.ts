import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from 'src/entity/city.entity';
import { District } from 'src/entity/district.entity';
import { Ward } from 'src/entity/ward.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(City)
        private readonly cityRepository: Repository<City>,

        @InjectRepository(District)
        private readonly districtRepository: Repository<District>,

        @InjectRepository(Ward)
        private readonly wardRepository: Repository<Ward>,
    ) { }

    async getLocation() {
        const allWard = await this.wardRepository.find();
        const allDistrict = await this.districtRepository.find();
        const allCity = await this.cityRepository.find();

        allDistrict.map((district) => {
            district.wards = [];

            allWard.map((ward) => {
                if (district.id === ward.district_id) {
                    district.wards.push(ward);
                }
            });
        });

        const citys = allCity.map((city) => {
            city.district = [];

            allDistrict.map((district) => {
                if (city.id === district.city_id) {
                    city.district.push(district);
                }
            });
            return city;
        });
        return citys;
    }
}
