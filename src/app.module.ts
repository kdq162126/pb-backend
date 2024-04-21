import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { JudgeModule } from './modules/judge/judge.module';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JudgeModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
