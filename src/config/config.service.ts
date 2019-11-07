import { number, object, ObjectSchema, string } from '@hapi/joi'
import { Injectable, Logger } from '@nestjs/common'
import * as dotenv from 'dotenv'
import { ensureDirSync } from 'fs-extra'
import { resolve } from 'path'

import {
  ENV_DEV,
  ENV_PROD,
  ENV_TEST,
  isDev,
  isProd,
  isTest,
} from './environment'

export interface Config {
  googleMapsApi: string
  darkskyApi: string
  env: string
  dataDir: string
  host: string
  port: number
  admin: {
    username: string
    password: string
  }
}

@Injectable()
export class ConfigService {
  private readonly logger = new Logger('ConfigService')
  readonly config: Config

  constructor(path: string) {
    this.logger.log(`Loading config from ${path}`)

    try {
      const { parsed, error } = dotenv.config({ path })
      if (error || !parsed) {
        throw Error(`Unable to parse config at ${path}\n${error}`)
      }

      this.config = this.mapAndValidateConfig()

      this.logger.log('Setting up data directory')
      this.logger.debug(this.config.dataDir)
      ensureDirSync(this.config.dataDir)
    } catch (error) {
      this.logger.error('Unable to load env config!')
      this.logger.error(error.message)
      throw error
    }
  }

  get isDevMode(): boolean {
    return isDev(this.config)
  }

  get isProd(): Boolean {
    return isProd(this.config)
  }

  get isTest(): boolean {
    return isTest(this.config)
  }

  private mapAndValidateConfig(): Config {
    const { error, value: validated } = EnvConfigSchema.validate(
      process.env as EnvConfig,
      { stripUnknown: true },
    )

    if (error) {
      throw new Error(`env validation error: ${error.message}`)
    }

    return this.mapEnvConfig(validated)
  }

  private mapEnvConfig(validEnvConfig: EnvConfig): Config {
    return {
      googleMapsApi: validEnvConfig.API_KEY_GOOGLE_MAPS,
      darkskyApi: validEnvConfig.API_KEY_DARKSKY,
      env: validEnvConfig.NODE_ENV,
      dataDir: validEnvConfig.DATA_DIR,
      host: validEnvConfig.HOST,
      port: (validEnvConfig.PORT as unknown) as number,
      admin: {
        username: validEnvConfig.ADMIN_USERNAME,
        password: validEnvConfig.ADMIN_PASSWORD,
      },
    }
  }
}

interface EnvConfig extends NodeJS.ProcessEnv {
  NODE_ENV: string
  API_KEY_GOOGLE_MAPS: string
  API_KEY_DARKSKY: string
  DATA_DIR: string
  HOST: string
  PORT: string
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
}

const DEFAULT_PORT = 3000
const DEFAULT_HOST = 'localhost'
const DEFAULT_ADMIN_USERNAME = 'admin'

const EnvConfigSchema: ObjectSchema = object({
  NODE_ENV: string()
    .valid(ENV_DEV)
    .valid(ENV_PROD)
    .valid(ENV_TEST)
    .default(process.env.NODE_ENV || ENV_PROD),
  API_KEY_GOOGLE_MAPS: string().required(),
  API_KEY_DARKSKY: string().required(),
  DATA_DIR: string().default(
    process.env.DATA_DIR || resolve(process.cwd(), 'data'),
  ),
  HOST: string().default(process.env.HOST || DEFAULT_HOST),
  PORT: number().default(process.env.PORT || DEFAULT_PORT),
  ADMIN_USERNAME: string().default(DEFAULT_ADMIN_USERNAME),
  ADMIN_PASSWORD: string()
    .min(8)
    .required(),
})
