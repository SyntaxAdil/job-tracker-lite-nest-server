import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schema/application.schema.js';
import { Model, Types } from 'mongoose';
import { CreateApplicationDto } from './dto/application.dto.ts.js';
import { UpdateApplicationDtoTs } from './dto/update-application.dto.ts.js';
import { AppModule } from '../app.module.js';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<Application>,
  ) {}

  async createApplication(payload: CreateApplicationDto) {
    const { companyName, jobType, position } = payload;
    const findExistingJob = await this.applicationModel.findOne({
      companyName,
      jobType,
      position,
    });

    if (findExistingJob) {
      throw new ConflictException('Application already exists');
    }

    return this.applicationModel.create(payload);
  }

  async findAll() {
    return await this.applicationModel.find();
  }

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid application id');
    const find = await this.applicationModel.findById(id);
    if (!find) throw new NotFoundException('No Application found.');

    return find;
  }

  async updateApplication(id: string, payload: UpdateApplicationDtoTs) {
    const applicaiton = await this.findOne(id);

    Object.assign(applicaiton, payload);

    return applicaiton.save();
  }

  async deleteApplication(id: string) {
    const application = await this.findOne(id);
    await application.deleteOne();
  }
}
