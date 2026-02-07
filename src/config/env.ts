import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

const loadEnvVariables = (): EnvConfig => {

    const requiredEnvVars = [
        'PORT',
        'NODE_ENV',
        'DATABASE_URL',
        'BETTER_AUTH_SECRET',
        'BETTER_AUTH_URL',
    ];
    requiredEnvVars.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(`Environment variable ${variable} is required but not set in .env file.`);
        }
    })
    return {
        PORT: process.env.PORT as string || '8000',
        NODE_ENV: process.env.NODE_ENV as string || 'production',
        DATABASE_URL: process.env.DATABASE_URL as string ,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
    };
}

export const envVars = loadEnvVariables();