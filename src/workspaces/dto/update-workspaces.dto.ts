import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateWorkspacesDto } from './workspaces.dto.js';

export class UpdateWorkspacesDto extends PartialType(
  OmitType(CreateWorkspacesDto, ['isArchived'] as const),
) {}
