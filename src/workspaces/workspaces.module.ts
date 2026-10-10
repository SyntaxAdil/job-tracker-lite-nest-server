import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service.js';
import { WorkspacesController } from './workspaces.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { Workspaces, WorkspacesSchema } from './schema/workspaces.schema.js';
import { AuthUser, AuthUserSchema } from '../users/schema/auth.user.schema.js';

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
    ]),
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
