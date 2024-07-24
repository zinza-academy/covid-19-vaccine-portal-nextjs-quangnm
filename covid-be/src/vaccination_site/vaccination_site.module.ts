import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinationSite } from "src/entity/vaccination_site.entty";
import { VaccinationSiteService } from "./service/vaccination_site.service";
import { VaccinationSitesController } from "./controller/vaccination_site.controler";
import { Ward } from "src/entity/ward.entity";

@Module({
    imports: [TypeOrmModule.forFeature([VaccinationSite, Ward])],
    providers: [VaccinationSiteService],
    controllers: [VaccinationSitesController]
})

export class VaccinationSiteModule {}
