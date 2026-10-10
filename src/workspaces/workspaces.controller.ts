import { type UserSession } from '@thallesp/nestjs-better-auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Session,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service.js';
import { CreateWorkspacesDto } from './dto/workspaces.dto.js';
import { UpdateWorkspacesDto } from './dto/update-workspaces.dto.js';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOneWorkspace(id);
  }

  @Patch()
  updateOne(@Param("id") id:string, @Body() data:UpdateWorkspacesDto){
    return this.workspacesService.updateWorkspace(id,data)
  }

  @Patch(":id/archive")
  archiveWorkspace(@Param("id") id:string){
    return this.workspacesService.archiveWorkspace(id)
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Session() session: UserSession) {
    return this.workspacesService.deleteWorkspace(id, session.user.id);
  }


}
