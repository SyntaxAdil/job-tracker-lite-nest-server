import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service.js';
import { WorkspacesController } from './workspaces.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspaces, WorkspacesSchema } from './schema/workspaces.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Workspaces.name,
        schema: WorkspacesSchema,
      },
    ]),
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
