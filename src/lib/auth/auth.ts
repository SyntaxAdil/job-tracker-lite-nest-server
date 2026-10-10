import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { jwt } from 'better-auth/plugins';
import { env } from '../../config/env.js';

const client = new MongoClient(env.mongoUri);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secret: env.authSecret,

  emailAndPassword: { enabled: true },
  plugins: [jwt()],
  baseURL: env.authUrl,
  trustedOrigins: [env.clientUrl, 'http://localhost:3000'],
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
