import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1713691204942 implements MigrationInterface {
  name = 'Initial1713691204942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`blacklist\` CHANGE \`meta\` \`meta\` json NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`whitelist\` CHANGE \`meta\` \`meta\` json NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`whitelist\` CHANGE \`meta\` \`meta\` json NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`blacklist\` CHANGE \`meta\` \`meta\` json NOT NULL`,
    );
  }
}
