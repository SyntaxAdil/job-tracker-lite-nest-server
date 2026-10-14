import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspaces } from './schema/workspaces.schema.js';
import { AuthUser } from '../users/schema/auth.user.schema.js';
import { CreateWorkspacesDto } from './dto/workspaces.dto.js';
import { UpdateWorkspacesDto } from './dto/update-workspaces.dto.js';
import { Application } from '../application/schema/application.schema.js';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspaces.name) private workspaceModel: Model<Workspaces>,
    @InjectModel(AuthUser.name) private userModel: Model<AuthUser>,
    @InjectModel(Application.name) private applicationModel: Model<Application>,
  ) {}

  private async findOwned(id: string, userId: string) {
    const ws = await this.workspaceModel.findOne({ _id: id, ownerId: userId });
    if (!ws) throw new NotFoundException('Workspace not found.');
    return ws;
  }

  findAll() {
    return this.workspaceModel
      .find()
      .select('name description ownerId applications isArchived')
      .lean();
  }

  findMyWs(userId: string, isArchived?: boolean) {
    const query: { ownerId: string; isArchived?: boolean } = {
      ownerId: userId,
    };
    if (isArchived !== undefined) query.isArchived = isArchived;
    return this.workspaceModel.find(query).sort({ createdAt: -1 });
  }

  findOneWorkspace(id: string, userId: string) {
    return this.findOwned(id, userId);
  }

  async createWorkspace(payload: CreateWorkspacesDto, userId: string) {
    let ws;
    try {
      ws = await this.workspaceModel.create({
        ...payload,
        ownerId: userId,
        applications: [],
        isArchived: false,
      });
    } catch (e: any) {
      if (e.code === 11000) {
        throw new ConflictException('Workspace already exists');
      }
      throw e;
    }

    await this.userModel.updateOne(
      { _id: userId },
      { $addToSet: { workspaces: ws._id.toString() } },
    );
    return ws;
  }

  async updateWorkspace(id: string, data: UpdateWorkspacesDto, userId: string) {
    const ws = await this.findOwned(id, userId);
    Object.assign(ws, data);
    await ws.save();
    return ws;
  }

  async archiveWorkspace(id: string, userId: string) {
    const ws = await this.findOwned(id, userId);
    ws.isArchived = !ws.isArchived;
    await ws.save();
    return ws;
  }

  async deleteWorkspace(id: string, userId: string) {
    const ws = await this.findOwned(id, userId);

    await this.applicationModel.deleteMany({ workspaceId: ws._id });
    await ws.deleteOne();
    await this.userModel.updateOne(
      { _id: userId },
      { $pull: { workspaces: id } },
    );

    return { deleted: true };
  }
}
