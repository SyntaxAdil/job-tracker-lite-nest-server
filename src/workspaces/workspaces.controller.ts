import { type UserSession } from '@thallesp/nestjs-better-auth';
import { Body, Controller, Get, Post, Session } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service.js';
import { CreateWorkspacesDto } from './dto/workspaces.dto.js';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  @Post()
  create(
    @Body() payload: CreateWorkspacesDto,
    userId: string,
    @Session() session: UserSession,
  ) {
    return this.workspacesService.createWorkspace(
      payload,
      (userId = session.user.id),
    );
  }
}
