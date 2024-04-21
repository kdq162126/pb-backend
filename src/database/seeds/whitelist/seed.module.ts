import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhitelistEntity } from '../../entities';
import { WhitelistSeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([WhitelistEntity])],
  providers: [WhitelistSeedService, Logger],
  exports: [WhitelistSeedService],
})
export class WhitelistSeedModule {}
