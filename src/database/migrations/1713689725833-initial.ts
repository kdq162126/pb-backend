import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1713689725833 implements MigrationInterface {
  name = 'Initial1713689725833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`blacklist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`platform\` enum ('twitter', 'website') NOT NULL, \`desc\` text NULL, \`meta\` json NOT NULL, INDEX \`idx-blacklist-code\` (\`code\`), INDEX \`idx-blacklist-platform\` (\`platform\`), UNIQUE INDEX \`idx-blacklist-code-platform\` (\`code\`, \`platform\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`whitelist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`platform\` enum ('twitter', 'website') NOT NULL, \`desc\` text NULL, \`meta\` json NOT NULL, INDEX \`idx-whitelist-code\` (\`code\`), INDEX \`idx-whitelist-platform\` (\`platform\`), UNIQUE INDEX \`idx-whitelist-code-platform\` (\`code\`, \`platform\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`idx-whitelist-code-platform\` ON \`whitelist\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx-whitelist-platform\` ON \`whitelist\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx-whitelist-code\` ON \`whitelist\``,
    );
    await queryRunner.query(`DROP TABLE \`whitelist\``);
    await queryRunner.query(
      `DROP INDEX \`idx-blacklist-code-platform\` ON \`blacklist\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx-blacklist-platform\` ON \`blacklist\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx-blacklist-code\` ON \`blacklist\``,
    );
    await queryRunner.query(`DROP TABLE \`blacklist\``);
  }
}
