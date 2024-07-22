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
import { ConfigModule } from '@nestjs/config';
import { VaccinationRegistrationModule } from './vaccination_registration/vaccination_registration.module';
import { VaccinationSiteModule } from './vaccination_site/vaccination_site.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'covid',
      entities: [User, Ward, District, City, VaccinationSite, Registration, Role],
      migrations: [__dirname + 'src/entity/migrations/**/*{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    LocationModule,
    AuthModule,
    VaccinationRegistrationModule,
    VaccinationSiteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {
  constructor(private dataSource: DataSource) { }
}

