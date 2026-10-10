import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Application } from '../../application/schema/application.schema.js';

export type WorkspaceDocument = HydratedDocument<Workspaces>;

@Schema({
  collection: 'workspaces',
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: (_doc, ret: Record<string, any>) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Workspaces {
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 80,
  })
  name: string;

  @Prop({ type: String, trim: true, maxlength: 500 })
  description?: string;

  @Prop({ type: Types.ObjectId, required: true, index: true })
  ownerId: Types.ObjectId;

  @Prop({
    type: [{ type: Types.ObjectId, ref: Application.name }],
    default: [],
  })
  applications: Types.ObjectId[];

  @Prop({ type: Boolean, default: false })
  isArchived: boolean;
}

export const WorkspacesSchema = SchemaFactory.createForClass(Workspaces);

WorkspacesSchema.index({ ownerId: 1, name: 1 }, { unique: true });
