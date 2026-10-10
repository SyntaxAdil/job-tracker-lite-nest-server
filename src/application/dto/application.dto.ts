import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsIn(['applied', 'interview', 'rejected', 'selected'])
  status: 'applied' | 'interview' | 'rejected' | 'selected';

  @IsIn(['high', 'medium', 'low'])
  priority: 'high' | 'medium' | 'low';

  @IsOptional()
  @IsNumber()
  @Min(0)
  minSalary?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxSalary?: number;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsIn(['full-time', 'part-time', 'internship', 'contract'])
  jobType: 'full-time' | 'part-time' | 'internship' | 'contract';

  @IsOptional()
  @IsDateString()
  appliedAt?: string;

  @IsOptional()
  @IsDateString()
  interviewDate?: string;

  @IsOptional()
  @IsString()
  jobUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
