import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service.js';
import { WorkspacesController } from './workspaces.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspaces, WorkspacesSchema } from './schema/workspaces.schema.js';
import { AuthUser, AuthUserSchema } from '../users/schema/auth.user.schema.js';
import { Application, ApplicationSchema } from '../application/schema/application.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Workspaces.name,
        schema: WorkspacesSchema,
      },
      {
        name: AuthUser.name,
        schema: AuthUserSchema,
      },
      {
        name: Application.name,
        schema: ApplicationSchema,
      },
    ]),
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
