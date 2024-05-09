import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { JudgeModule } from './modules/judge/judge.module';
import {EnterpriseController} from 'src/controller/enterprise.controller';
import {WebsiteController} from 'src/controller/website.controller';
import {AuthController} from 'src/controller/login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntityRepository } from './dto/user.repositoy';
import { EnterpriseEntityRepository } from './dto/enterprise.repository';
import { WebsiteEntityRepository } from './dto/website.repository';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JudgeModule,
    TypeOrmModule.forFeature([
      UserEntityRepository,
      EnterpriseEntityRepository,
      WebsiteEntityRepository,
    ]),
  ],
  controllers: [EnterpriseController, WebsiteController, AuthController],
  providers: [],
})
export class AppModule {}
