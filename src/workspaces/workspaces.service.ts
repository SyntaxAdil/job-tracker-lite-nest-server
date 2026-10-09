import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Workspaces } from './schema/workspaces.schema.js';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectModel(Workspaces.name)
    private workspaceModel: Model<Workspaces>,
  ) {}

  async create(payload: any) {
    return await this.workspaceModel.create(payload);
  }

  async findAll() {
    return await this.workspaceModel.find();
  }
}
