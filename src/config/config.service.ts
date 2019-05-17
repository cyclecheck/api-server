import { readFileSync } from 'fs'

import { Injectable, Logger } from '@nestjs/common'
import { parse } from 'dotenv'
import { object, ObjectSchema, string, number, validate } from 'joi'
import {
  ENVS,
  ENV_DEV,
  isDev,
  isProd,
  isTest,
  getEnvFilename,
} from './environment'

export interface Config {
  openweatherApi: string
  env: string
  host: string
  port: number
}

@Injectable()
export class ConfigService {
  private readonly logger = new Logger('ConfigService')
  readonly config: Config

  constructor(filePath: string) {
    this.logger.log(`Loading config from ${filePath}`)

    try {
      const config = parse(readFileSync(filePath))
      this.config = this.mapAndValidateConfig(config as any)
    } catch (error) {
      this.logger.error('Unable to load env config!')
      this.logger.error(error.message)
      throw error
    }
  }

  get isDev(): boolean {
    return isDev(this.config)
  }

  get isProd(): Boolean {
    return isProd(this.config)
  }

  get isTest(): boolean {
    return isTest(this.config)
  }

  private mapAndValidateConfig(envConfig: EnvConfig): Config {
    const { error, value: validated } = validate(envConfig, EnvConfigSchema)

    if (error) {
      throw new Error(`env validation error: ${error.message}`)
    }

    return this.mapEnvConfig(validated)
  }

  private mapEnvConfig(validEnvConfig: EnvConfig): Config {
    return {
      openweatherApi: validEnvConfig.API_KEY_OPENWEATHER,
      env: validEnvConfig.NODE_ENV,
      host: validEnvConfig.HOST,
      port: validEnvConfig.PORT,
    }
  }
}

interface EnvConfig {
  NODE_ENV: string
  API_KEY_OPENWEATHER: string
  HOST: string
  PORT: number
}

const EnvConfigSchema: ObjectSchema = object({
  NODE_ENV: string()
    .valid(ENVS)
    .default(ENV_DEV),
  API_KEY_OPENWEATHER: string().required(),
  HOST: string().default('localhost'),
  PORT: number().default(3000),
})
