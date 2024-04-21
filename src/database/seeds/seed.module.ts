import { Logger, Module } from '@nestjs/common';
import { DatabaseModule } from '../../shared/database/database.module';
import { SeedService } from './seed.service';
import { WhitelistSeedModule } from './whitelist/seed.module';
import { BlacklistSeedModule } from './blacklist/seed.module';

@Module({
  imports: [
    DatabaseModule,
    WhitelistSeedModule,
    BlacklistSeedModule
  ],
  providers: [SeedService, Logger],
})
export class SeedModule { }
