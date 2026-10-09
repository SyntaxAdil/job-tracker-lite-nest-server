import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { ApplicationModule } from './application/application.module.js';
import { LoggerMiddleware } from './common/logger.middleware.js';
import { WorkspacesModule } from './workspaces/workspaces.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGO_URI'),
        connectionFactory: (connection: Connection) => {
          if (connection.readyState === 1) {
            console.log('✅ MongoDB connected');
          }
          connection.on('error', (err: Error) => {
            console.error('❌ MongoDB error:', err.message);
          });
          connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
          });
          return connection;
        },
      }),
    }),

    ApplicationModule,

    WorkspacesModule,

    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
