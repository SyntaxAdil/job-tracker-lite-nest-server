import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Application } from '../../application/schema/application.schema.js';
import { User } from '../../users/schema/user.schema.js';

export type workspacesDocument = HydratedDocument<Workspaces>;

@Schema({ timestamps: true })
export class Workspaces {
  @Prop({
    required: true,
    type: String,
    minLength: 1,
  })
  workspaceName: string;
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: User.name,
  })
  ownerId: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Application.name }],
    default: [],
  })
  applications: Types.ObjectId[];
}

export const WorkspacesSchema = SchemaFactory.createForClass(Workspaces);
