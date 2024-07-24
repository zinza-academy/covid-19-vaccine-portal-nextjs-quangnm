import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { VacctinationRegistrationService } from "../service/vaccination_registration.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { VaccineRegistrationDto } from "../dto/vaccination_registration.dto";

@Controller('registration')
export class VacctinationRegistrationController{
    constructor(private readonly registrationService: VacctinationRegistrationService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createRegistration : VaccineRegistrationDto){
        return await this.registrationService.create(createRegistration)
    }

    @Get(':id')
    async getById(@Param('id') id : number){
        return await this.registrationService.getById(id)
    }
}
