import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service.js';
import { ApplicationController } from './application.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Application, ApplicationSchema } from './schema/application.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Application.name,
        schema: ApplicationSchema,
      },
    ]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
