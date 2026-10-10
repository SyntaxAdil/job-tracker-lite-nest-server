import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Application } from './schema/application.schema.js';
import { Model, Types } from 'mongoose';
import { CreateApplicationDto } from './dto/application.dto.js';
import { UpdateApplicationDtoTs } from './dto/update-application.dto.ts.js';
import { Workspaces } from '../workspaces/schema/workspaces.schema.js';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private applicationModel: Model<Application>,
    @InjectModel(Workspaces.name)
    private workspaceModel: Model<Workspaces>,
  ) {}

  // creating a new application inside a workspace
  async createApplication(
    payload: CreateApplicationDto,
    workspaceId: string,
    userId: string,
  ) {
    // workspace must belong to the login user
    const workspace = await this.workspaceModel.findOne({
      _id: workspaceId,
      ownerId: userId,
    });
    if (!workspace) throw new NotFoundException('Workspace not found.');

    const { companyName, jobType, position } = payload;

    // duplicate check only inside this workspace
    const findExistingJob = await this.applicationModel.findOne({
      workspaceId,
      companyName,
      jobType,
      position,
    });

    if (findExistingJob) {
      throw new ConflictException('Application already exists');
    }

    const newApplicaiton = await this.applicationModel.create({
      ...payload,
      workspaceId,
    });

    await this.workspaceModel.updateOne(
      {
        _id: workspaceId,
      },
      {
        $addToSet: {
          applications: newApplicaiton._id.toString(),
        },
      },
    );

    return newApplicaiton;
  }

  // find all applications of login user's workspaces
  async findAll(userId: string) {
    const workspaces = await this.workspaceModel
      .find({ ownerId: userId })
      .select('_id');

    const workspaceIds = workspaces.map((w) => w._id);

    return await this.applicationModel.find({
      workspaceId: { $in: workspaceIds },
    });
  }

  // find one application (only if its workspace belongs to the user)
  async findOne(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('Invalid application id');
    const find = await this.applicationModel.findById(id);
    if (!find) throw new NotFoundException('No Application found.');

    const workspace = await this.workspaceModel.findOne({
      _id: find.workspaceId,
      ownerId: userId,
    });
    if (!workspace) throw new NotFoundException('No Application found.');

    return find;
  }

  // update an application
  async updateApplication(
    id: string,
    payload: UpdateApplicationDtoTs,
    userId: string,
  ) {
    const applicaiton = await this.findOne(id, userId);

    Object.assign(applicaiton, payload);

    return applicaiton.save();
  }

  // delete an application
  async deleteApplication(id: string, userId: string) {
    const application = await this.findOne(id, userId);

    await application.deleteOne();

    await this.workspaceModel.updateOne(
      {
        _id: application.workspaceId,
      },
      {
        $pull: {
          applications: application._id,
        },
      },
    );
  }
}
