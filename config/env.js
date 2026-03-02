import dotenv from 'dotenv';

dotenv.config();

const env ={
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
}

const requiredVars =[
  'PORT',
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_SECRET"
];

requiredVars.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default env;