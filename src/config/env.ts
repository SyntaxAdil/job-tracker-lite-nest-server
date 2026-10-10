import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env variable: ${name}`);
  return value;
}

export const env = {
  mongoUri: required('MONGO_URI'),
  authSecret: required('BETTER_AUTH_SECRET'),
};
