import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationService } from './application.service.js';
import { CreateApplicationDto } from './dto/application.dto.js';
import { UpdateApplicationDtoTs } from './dto/update-application.dto.ts.js';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  findAll() {
    return this.applicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateApplicationDto) {
    return this.applicationService.createApplication(data);
  }

  @Patch()
  updateOne(@Param('id') id: string, @Body() data: UpdateApplicationDtoTs) {
    return this.applicationService.updateApplication(id, data);
  }

  @Delete()
  deleteOne(@Param('id') id: string) {
    return this.applicationService.deleteApplication(id);
  }
}
