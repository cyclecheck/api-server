import { readFileSync } from 'fs'

import { Injectable } from '@nestjs/common'
import { parse } from 'dotenv'
import { object, ObjectSchema, string, number } from 'joi'

interface EnvConfig {
  API_KEY_OPENWEATHER: string
  HOST: string
  PORT: number
}

const EnvConfigSchema: ObjectSchema = object({
  NODE_ENV: string(),
  API_KEY_OPENWEATHER: string().required(),
  HOST: string().default('localhost'),
  PORT: number().default(3000),
})

export interface Config {
  openweatherApi: string
  env: string
  host: string
  port: number
}

@Injectable()
export class ConfigService {}
