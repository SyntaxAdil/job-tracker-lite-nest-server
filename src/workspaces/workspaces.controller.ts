import { type UserSession } from '@thallesp/nestjs-better-auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service.js';
import { CreateWorkspacesDto } from './dto/workspaces.dto.js';
import { UpdateWorkspacesDto } from './dto/update-workspaces.dto.js';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  // get all workspaces
  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  // get login users ws
  @Get('me')
  findMyWs(
    @Session() session: UserSession,
    @Query('archive') archive?: boolean,
  ) {
    return this.workspacesService.findMyWs(session.user.id, archive);
  }

  // create new workspace
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

  // get one ws
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOneWorkspace(id);
  }

  // update one ws
  @Patch()
  updateOne(@Param('id') id: string, @Body() data: UpdateWorkspacesDto) {
    return this.workspacesService.updateWorkspace(id, data);
  }

  // archive a workspace (toggling)
  @Patch(':id/archive')
  archiveWorkspace(@Param('id') id: string) {
    return this.workspacesService.archiveWorkspace(id);
  }

  // delete a complete ws
  @Delete(':id')
  delete(@Param('id') id: string, @Session() session: UserSession) {
    return this.workspacesService.deleteWorkspace(id, session.user.id);
  }
}
