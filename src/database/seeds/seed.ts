import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const logger = appContext.get(Logger);
  const seedService = appContext.get(SeedService);
  logger.debug('start seeding...\n');
  await seedService.seed();
  logger.debug('seed is complete.');
  appContext.close();
}
bootstrap();
