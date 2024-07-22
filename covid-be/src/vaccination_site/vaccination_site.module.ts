import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VaccinationSite } from "src/entity/vaccination_site.entty";
import { VaccinationSiteService } from "./service/vaccination_site.service";

@Module({
    imports: [TypeOrmModule.forFeature([VaccinationSite])],
    providers: [VaccinationSiteService],
    // controllers: [Vacin]
})

export class VaccinationSiteModule {}