import { Roles, Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service.js';
import { CreateWorkspacesDto } from './dto/workspaces.dto.js';
import { UpdateWorkspacesDto } from './dto/update-workspaces.dto.js';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  // get all workspaces
  // @Roles(['admin'])
  @Get()
  findAll() {
    return this.workspacesService.findAll();
  }

  // get login user's ws
  @Get('me')
  findMyWs(
    @Session() session: UserSession,
    @Query('archive', new ParseBoolPipe({ optional: true })) archive?: boolean,
  ) {
    return this.workspacesService.findMyWs(session.user.id, archive);
  }

  // create new workspace
  @Post()
  create(
    @Body() payload: CreateWorkspacesDto,
    @Session() session: UserSession,
  ) {
    return this.workspacesService.createWorkspace(payload, session.user.id);
  }

  // get one ws
  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: UserSession) {
    return this.workspacesService.findOneWorkspace(id, session.user.id);
  }

  // update one ws
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() data: UpdateWorkspacesDto,
    @Session() session: UserSession,
  ) {
    return this.workspacesService.updateWorkspace(id, data, session.user.id);
  }

  // archive a workspace (toggling)
  @Patch(':id/archive')
  archiveWorkspace(@Param('id') id: string, @Session() session: UserSession) {
    return this.workspacesService.archiveWorkspace(id, session.user.id);
  }

  // delete a complete ws
  @Delete(':id')
  delete(@Param('id') id: string, @Session() session: UserSession) {
    return this.workspacesService.deleteWorkspace(id, session.user.id);
  }
}
