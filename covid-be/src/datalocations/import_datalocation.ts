import { Command, Console } from 'nestjs-console';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Excel from 'exceljs';
import * as path from 'path';
import { City } from 'src/entity/city.entity';
import { District } from 'src/entity/district.entity';
import { Ward } from 'src/entity/ward.entity';

@Console()
@Injectable()
export class ImportLocationDataCommand {
    constructor(
        @InjectRepository(City)
        private provincesRepository: Repository<City>,
        @InjectRepository(District)
        private districtsRepository: Repository<District>,
        @InjectRepository(Ward)
        private wardsRepository: Repository<Ward>,
    ) { }

    @Command({
        command: 'import-location-data',
        description: 'Import location data from Excel file',
    })
    async importLocationData(): Promise<void> {
        const filePath = path.join(__dirname, '/datalocation.xlsx');

        const workbook = new Excel.Workbook();
        try {
            await workbook.xlsx.readFile(filePath);
        } catch (error) {
            return;
        }

        const worksheet = workbook.getWorksheet(1);
        if (!worksheet) {
            return;
        }

        let countCity: City | null = null;
        let countDistrict: District | null = null;

        for (let i = 2; i <= worksheet.rowCount; i++) {
            const row = worksheet.getRow(i);
            const cityName = row.getCell(1).value?.toString();
            const districtName = row.getCell(3).value?.toString();
            const wardName = row.getCell(5).value?.toString();

            if (cityName) {
                countCity = await this.provincesRepository.findOne({
                    where: { name: cityName },
                });
                if (!countCity) {
                    countCity = this.provincesRepository.create({
                        name: cityName,
                    });
                    await this.provincesRepository.save(countCity);
                }
            }

            if (districtName && countCity) {
                countDistrict = await this.districtsRepository.findOne({
                    where: { name: districtName, city_id: countCity.id },
                });
                if (!countDistrict) {
                    countDistrict = this.districtsRepository.create({
                        name: districtName,
                        city_id: countCity.id
                    });
                    await this.districtsRepository.save(countDistrict);
                }
            }

            if (wardName && countDistrict) {
                let ward = await this.wardsRepository.findOne({
                    where: { name: wardName, district_id: countDistrict.id },
                });
              
                if (!ward) {
                    ward = this.wardsRepository.create({
                        name: wardName,
                        district_id: countDistrict.id
                    });
                    await this.wardsRepository.save(ward);
                }
            }
        }
    }
}
