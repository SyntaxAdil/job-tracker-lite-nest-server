import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { env } from '../../config/env.js';

const client = new MongoClient(env.mongoUri, { maxPoolSize: 5 });
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  secret: env.authSecret,
  emailAndPassword: { enabled: true },
  baseURL: env.authUrl,
  trustedOrigins: [env.clientUrl],
  user: {
    additionalFields: {
      workspaces: {
        type: 'string[]',
        required: false,
        defaultValue: [],
        input: false,
      },
    },
  },
});
