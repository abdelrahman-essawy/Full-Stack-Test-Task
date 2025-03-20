import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigAppModule } from '../config/config.module';

@Module({
  imports: [ConfigAppModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
