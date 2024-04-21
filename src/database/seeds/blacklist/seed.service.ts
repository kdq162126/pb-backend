import * as fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { BlacklistEntity } from '../../entities';

@Injectable()
export class BlacklistSeedService {
  private objects: DeepPartial<BlacklistEntity>[];
  private entityName: string;

  constructor(
    @InjectRepository(BlacklistEntity)
    private repo: Repository<BlacklistEntity>,
    private readonly logger: Logger,
  ) {
    this.entityName = repo.metadata.name
  }

  async seed(): Promise<void> {
    this.logger.debug(`... Start seeding for ${this.entityName} ...`);

    const jsonData = JSON.parse(
      fs.readFileSync(__dirname + '/data.json', 'utf-8'),
    );
    this.objects = jsonData;
    const seeding = this.objects.map(
      async (object) => {
        const record = await this.repo.findOneBy({
          code: object.code,
          platform: object.platform
        });
        if (record) {
          const recordToUpdate = Object.assign(record, object);
          await this.repo.save(recordToUpdate);
          this.logger.debug(`Update record: ${object.code} - ${object.platform}`);
        } else {
          const newRecord = this.repo.create(object);
          await this.repo.save(newRecord);
          this.logger.debug(`Create new record: ${object.code} - ${object.platform}`);
        }
      },
    );
    await Promise.all(seeding);

    this.logger.debug(`... Finish seeding for ${this.entityName} ...\n`);
  }
}
