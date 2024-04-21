import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistEntity } from '../../entities';
import { BlacklistSeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlacklistEntity])],
  providers: [BlacklistSeedService, Logger],
  exports: [BlacklistSeedService],
})
export class BlacklistSeedModule {}
