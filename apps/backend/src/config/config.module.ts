import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import jwtConfig from './jwt.config';
import { validateEnvVariables } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig],
      validate: validateEnvVariables
    }),
  ],
})
export class ConfigAppModule {}
