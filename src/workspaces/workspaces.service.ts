import { UserSession } from '@thallesp/nestjs-better-auth';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  Session,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Workspaces } from './schema/workspaces.schema.js';
import { InjectModel } from '@nestjs/mongoose';
import { CreateWorkspacesDto } from './dto/workspaces.dto.js';
import { AuthUser } from '../users/schema/auth.user.schema.js';
import { UpdateWorkspacesDto } from './dto/update-workspaces.dto.js';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspaces.name)
    private workspaceModel: Model<Workspaces>,
    @InjectModel(AuthUser.name)
    private userModel: Model<AuthUser>,
  ) {}

  //find all workspaces -
  async findAll() {
    return await this.workspaceModel
      .find()
      .select('name description ownerId applications isArchived')
      .lean();
  }

  //find login user's workspaces - with archive filtering support
  async findMyWs(id: string, isArchived?: boolean) {
    const query: { ownerId: string; isArchived?: boolean } = { ownerId: id };
    if (isArchived !== undefined) {
      query.isArchived = isArchived;
    }
    const ws = await this.workspaceModel.find(query);
    if (!ws) throw new NotFoundException('No workspaces created by the user.');
    return ws;
  }

  // one particular workspace finding api
  async findOneWorkspace(id: string) {
    const ws = await this.workspaceModel.findById(id);
    if (!ws) throw new NotFoundException('No workspace found.');
    return ws;
  }

  // creating a new workspace api
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

  // delte completly a workspace
  async deleteWorkspace(id: string, userId: string) {
    const ws = await this.findOneWorkspace(id);
    await this.userModel.updateOne(
      { _id: userId },
      {
        $pull: {
          applications: ws._id,
        },
      },
    );
    await ws.deleteOne();
  }

  // update a workspace without isArchived
  async updateWorkspace(id: string, data: UpdateWorkspacesDto) {
    const ws = await this.findOneWorkspace(id);
    Object.assign(ws, data);
    ws.save();
    return ws;
  }

  // api for toggling isArchived - true <-> false
  async archiveWorkspace(id: string) {
    const ws = await this.findOneWorkspace(id);
    ws.isArchived = !ws.isArchived;
    ws.save();
    return ws;
  }
}
