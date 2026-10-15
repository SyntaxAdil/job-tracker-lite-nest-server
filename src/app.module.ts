import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { env } from './config/env.js';
import { auth } from './lib/auth/auth.js';
import { LoggerMiddleware } from './common/logger.middleware.js';
import { ApplicationModule } from './application/application.module.js';
import { WorkspacesModule } from './workspaces/workspaces.module.js';
import { UsersModule } from './users/users.module.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    MongooseModule.forRoot(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
      retryAttempts: 1,
      retryDelay: 1000,
      connectionFactory: (connection) => {
        if (connection.readyState === 1) {
          console.log('✅ MongoDB connected');
        }
        connection.on('error', (err: Error) =>
          console.error('❌ MongoDB error:', err.message),
        );
        connection.on('disconnected', () =>
          console.warn('⚠️ MongoDB disconnected'),
        );
        return connection;
      },
    }),
    AuthModule.forRoot({ auth }),
    ApplicationModule,
    WorkspacesModule,
    UsersModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
