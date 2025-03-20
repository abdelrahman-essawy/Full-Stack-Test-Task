import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { EnvConfig } from '../config/env.validation';

@Module({
  imports: [
    // TODO: increase db availability
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvConfig>) => ({
        uri: configService.get('DATABASE_URL'),
      }),
    }),
  ],
})
export class DatabaseModule {}
