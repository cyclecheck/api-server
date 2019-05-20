import { readFileSync } from 'fs'
import { Injectable, Logger } from '@nestjs/common'
import { parse } from 'dotenv'
import { object, ObjectSchema, string, number, validate } from 'joi'
import { resolve } from 'path'
import { ensureDirSync } from 'fs-extra'

import { ENVS, ENV_DEV, isDev, isProd, isTest } from './environment'

export interface Config {
  googleMapsApi: string
  openweatherApi: string
  env: string
  dataDir: string
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

      this.logger.log('Setting up data directory')
      this.logger.debug(this.config.dataDir)
      ensureDirSync(this.config.dataDir)
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
      googleMapsApi: validEnvConfig.API_KEY_GOOGLE_MAPS,
      openweatherApi: validEnvConfig.API_KEY_OPENWEATHER,
      env: validEnvConfig.NODE_ENV,
      dataDir: validEnvConfig.DATA_DIR,
      host: validEnvConfig.HOST,
      port: validEnvConfig.PORT,
    }
  }
}

interface EnvConfig {
  NODE_ENV: string
  API_KEY_GOOGLE_MAPS: string
  API_KEY_OPENWEATHER: string
  DATA_DIR: string
  HOST: string
  PORT: number
}

const EnvConfigSchema: ObjectSchema = object({
  NODE_ENV: string()
    .valid(ENVS)
    .default(ENV_DEV),
  API_KEY_GOOGLE_MAPS: string().required(),
  API_KEY_OPENWEATHER: string().required(),
  DATA_DIR: string().default(resolve(process.cwd(), 'data')),
  HOST: string().default('localhost'),
  PORT: number().default(3000),
})
