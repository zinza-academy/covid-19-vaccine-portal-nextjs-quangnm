import { Controller, Get } from "@nestjs/common";
import { LocationService } from "../services/location.service";

@Controller('location')
export class LocationController{

    constructor(private locationService: LocationService) {}

    @Get()
    async getLocation(){
        return await this.locationService.getLocation();
    }
}