import { Module } from '@nestjs/common';
import { HealthController } from './health.controller.js';

@Module({
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
