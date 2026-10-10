import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { AuthUser } from './schema/auth.user.schema.js';
import { Model } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(AuthUser.name) private userModel: Model<AuthUser>) {}
  @Get()
  async findAll() {
    return await this.userModel.find().select("name image workspaces -_id").lean();
  }

  @Get('me')
  me(@Session() session: UserSession) {
    return session.user;
  }
}
