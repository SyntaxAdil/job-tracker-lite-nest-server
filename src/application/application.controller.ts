import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service.js';
import { CreateApplicationDto } from './dto/application.dto.js';
import { UpdateApplicationDtoTs } from './dto/update-application.dto.ts.js';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // get all applications of login user's workspaces
  @Get()
  findAll(@Session() session: UserSession) {
    return this.applicationService.findAll(session.user.id);
  }

  // get one application
  @Get(':id')
  findOne(@Param('id') id: string, @Session() session: UserSession) {
    return this.applicationService.findOne(id, session.user.id);
  }

  // create new application inside a workspace
  @Post('/workspace/:workspaceId')
  create(
    @Body() data: CreateApplicationDto,
    @Param('workspaceId') workspaceId: string,
    @Session() session: UserSession,
  ) {
    return this.applicationService.createApplication(
      data,
      workspaceId,
      session.user.id,
    );
  }

  // update one application
  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body() data: UpdateApplicationDtoTs,
    @Session() session: UserSession,
  ) {
    return this.applicationService.updateApplication(id, data, session.user.id);
  }

  // delete one application
  @Delete(':id')
  deleteOne(@Param('id') id: string, @Session() session: UserSession) {
    return this.applicationService.deleteApplication(id, session.user.id);
  }
}