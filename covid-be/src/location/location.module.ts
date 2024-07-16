import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "src/entity/city.entity";
import { District } from "src/entity/district.entity";
import { Ward } from "src/entity/ward.entity";
import { LocationService } from "./services/location.service";
import { LocationController } from "./controller/location.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Ward, District, City])],
    providers: [LocationService],
    controllers: [LocationController]
    
})

export class LocationModule {}