import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema.js';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(payload: any) {
    return await this.userModel.create(payload);
  }
  async findAll() {
    return await this.userModel.find();
  }
}
