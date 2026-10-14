import { IsBoolean, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWorkspacesDto {
  @IsString()
  @MinLength(1)
  @MaxLength(80)
  name: string;

  @IsString()
  @MaxLength(500)
  @MinLength(1)
  description?: string;

}
