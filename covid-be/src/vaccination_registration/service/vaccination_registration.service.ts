import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Registration } from "src/entity/vaccination_registration.entity";
import { Repository } from "typeorm";
import { VaccineRegistrationDto } from "../dto/vaccination_registration.dto";

@Injectable()
export class VacctinationRegistrationService{
    constructor(
        @InjectRepository(Registration)
        private readonly vacctinationRegistrationRepository : Repository<Registration>
    ){}

    async create(createVaccineRegistrationDto : VaccineRegistrationDto){
        const newRegitration = this.vacctinationRegistrationRepository.create(createVaccineRegistrationDto)
        return await this.vacctinationRegistrationRepository.save(newRegitration)
    }

    async getById(id : number){
        return await this.vacctinationRegistrationRepository.findOne({ where: {id} })
    }
}