import { Injectable, Logger } from '@nestjs/common';
import { WhitelistSeedService } from './whitelist/seed.service';
import { BlacklistSeedService } from './blacklist/seed.service';


@Injectable()
export class SeedService {
  constructor(
    private readonly whitelistSeed: WhitelistSeedService,
    private readonly blacklistSeed: BlacklistSeedService,
  ) { }

  async seed(): Promise<void> {
    await this.whitelistSeed.seed();
    await this.blacklistSeed.seed();
  }
}
