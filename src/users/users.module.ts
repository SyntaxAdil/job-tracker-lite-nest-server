import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from './schema/auth.user.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: AuthUser.name,
        schema: AuthUserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
