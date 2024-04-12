import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
