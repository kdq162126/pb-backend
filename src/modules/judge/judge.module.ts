import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistEntity, WhitelistEntity } from 'src/database/entities';
import { JudgeController } from './judge.controller';
import { JudgeService } from './judge.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhitelistEntity, BlacklistEntity])],
  controllers: [JudgeController],
  providers: [JudgeService],
  exports: [],
})
export class JudgeModule {}
