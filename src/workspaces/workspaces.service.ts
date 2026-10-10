import { UserSession } from '@thallesp/nestjs-better-auth';
import { ConflictException, Injectable, Session } from '@nestjs/common';
import { Model } from 'mongoose';
import { Workspaces } from './schema/workspaces.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkspacesDto } from './dto/workspaces.dto.js';
import { AuthUser } from '../users/schema/auth.user.schema.js';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspaces.name)
    private workspaceModel: Model<Workspaces>,
    @InjectModel(AuthUser.name)
    private userModel: Model<AuthUser>,
  ) {}

  async createWorkspace(payload: CreateWorkspacesDto, userId: string) {
    const { name, isArchived } = payload;
    const existingWorkspace = await this.workspaceModel.findOne({
      name,
      isArchived,
    });
    if (existingWorkspace)
      throw new ConflictException('Workspace already exists');

    const newWorkspace = await this.workspaceModel.create({
      ...payload,
      ownerId: userId,
      applications: [],
    });

    await this.userModel.updateOne(
      {
        _id: userId,
      },
      {
        $addToSet: {
          workspaces: newWorkspace._id.toString(),
        },
      },
    );
    return newWorkspace;
  }

  async findAll() {
    return await this.workspaceModel.find();
  }
}
