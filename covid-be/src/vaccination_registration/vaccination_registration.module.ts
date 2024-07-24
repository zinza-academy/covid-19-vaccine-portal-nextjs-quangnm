import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Registration } from "src/entity/vaccination_registration.entity";
import { VacctinationRegistrationService } from "./service/vaccination_registration.service";
import { VacctinationRegistrationController } from "./controller/vaccination_registration.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Registration])],
    providers: [VacctinationRegistrationService],
    controllers: [VacctinationRegistrationController]
})

export class VacctinationRegistrationModule {}