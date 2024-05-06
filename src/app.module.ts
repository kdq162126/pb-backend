import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { JudgeModule } from './modules/judge/judge.module';
import {EnterpriseController} from 'src/controller/enterprise.controller';
import {WebsiteController} from 'src/controller/website.controller';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JudgeModule,
  ],
  controllers: [EnterpriseController, WebsiteController],
  providers: [],
})
export class AppModule {}
