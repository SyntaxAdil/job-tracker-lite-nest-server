import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ timestamps: true })
export class Application {
  @Prop({ required: true, trim: true })
  companyName: string;

  @Prop({ required: true, trim: true })
  position: string;

  @Prop({
    required: true,
    enum: ['applied', 'interview', 'rejected', 'selected'],
    default: 'applied',
  })
  status: 'applied' | 'interview' | 'rejected' | 'selected';

  @Prop({
    required: true,
    enum: ['high', 'medium', 'low'],
    default: 'medium',
  })
  priority: 'high' | 'medium' | 'low';

  @Prop({ type: Number, min: 0 })
  minSalary?: number;

  @Prop({ type: Number, min: 0 })
  maxSalary?: number;

  @Prop({ required: true, trim: true })
  location: string;

  @Prop({
    required: true,
    enum: ['full-time', 'part-time', 'internship', 'contract'],
  })
  jobType: 'full-time' | 'part-time' | 'internship' | 'contract';

  @Prop({ type: Date, default: Date.now })
  appliedAt: Date;

  @Prop({ type: Date })
  interviewDate?: Date;

  @Prop({ trim: true })
  jobUrl?: string;

  @Prop({ default: '' })
  notes: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
