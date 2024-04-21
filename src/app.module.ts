import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TubaService } from './tuba/tuba.service';
import { AllahModule } from './allah/allah.module';
import { SoulsModule } from './souls/souls.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      ssl: process.env.POSTGRES_SSL === 'true',
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'true',
    }),
    UsersModule,
    AuthModule,
    AllahModule,
    SoulsModule,
  ],
  controllers: [],
  providers: [TubaService],
})
export class AppModule {}
