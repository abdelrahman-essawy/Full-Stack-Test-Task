import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigAppModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [ConfigAppModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
