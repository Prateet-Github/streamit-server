import dotenv from 'dotenv';

dotenv.config();

const env ={
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_RAW_BUCKET: process.env.S3_RAW_BUCKET,
  S3_PROD_BUCKET: process.env.S3_PROD_BUCKET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT
}

const requiredVars =[
  'PORT',
  "NODE_ENV",
  "MONGODB_URI",
  "JWT_SECRET",
  "AWS_REGION",
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "S3_RAW_BUCKET",
  "S3_PROD_BUCKET",
  "REDIS_HOST",
  "REDIS_PORT"
];

requiredVars.forEach((key) => {
  if (!env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default env;