#!/usr/bin/env node

import { argv } from 'yargs'

import { getVersion } from './version/version'
import { ENV_DEV } from './config/environment'

if (argv.v || argv.version) {
  console.log(`v${getVersion()}`)
  process.exit(0)
}

if (argv.d || argv.dev) {
  process.env.NODE_ENV = ENV_DEV
}

// tslint:disable-next-line
require('./main').bootstrap()
