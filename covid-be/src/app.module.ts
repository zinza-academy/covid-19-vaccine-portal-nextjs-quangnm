import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import { UsersModule } from './users/users.module';
import { Ward } from './entity/ward.entity';
import { District } from './entity/district.entity';
import { City } from './entity/city.entity';
import { VaccinationSite } from './entity/vaccination_site.entty';
import { Registration } from './entity/vaccination_registration.entity';
import { Role } from './entity/role.entity';
import { LocationModule } from './location/location.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VaccinationRegistrationModule } from './vaccination_registration/vaccination_registration.module';
import { VaccinationSiteModule } from './vaccination_site/vaccination_site.module';
import { ConsoleModule } from 'nestjs-console';
import { ImportLocationDataCommand } from './datalocations/import_datalocation';
import { DatabaseConfig } from './entity/config/data.config';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([City, District, Ward, Role, VaccinationSite, Registration, User]),
    UsersModule,
    LocationModule,
    VaccinationRegistrationModule,
    VaccinationSiteModule,
    ConsoleModule,
    ForgotPasswordModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, ImportLocationDataCommand],
})


export class AppModule {
  constructor(private dataSource: DataSource) { }
}
