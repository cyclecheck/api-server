import { resolve } from 'path'

import { Config } from './config.service'

export const ENV_DEV = 'development'
export const ENV_PROD = 'production'
export const ENV_TEST = 'test'

export const ENVS = [ENV_DEV, ENV_PROD, ENV_TEST]

export const ENV_FILENAME = 'cyclecheck.env'

export const isDev = (config: Partial<Config> = {}) =>
  (config.env || process.env.NODE_ENV) === ENV_DEV

export const isProd = (config: Partial<Config> = {}) =>
  (config.env || process.env.NODE_ENV) === ENV_PROD

export const isTest = (config: Partial<Config> = {}) =>
  (config.env || process.env.NODE_ENV) === ENV_TEST

export function getEnvFilename() {
  const defaultPath = isProd() ? __dirname : process.cwd()
  return process.env.ENV_PATH || resolve(defaultPath, ENV_FILENAME)
}
