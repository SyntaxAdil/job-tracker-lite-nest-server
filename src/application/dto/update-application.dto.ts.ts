import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationDto } from './application.dto.ts.js';

export class UpdateApplicationDtoTs extends PartialType(CreateApplicationDto) {}
