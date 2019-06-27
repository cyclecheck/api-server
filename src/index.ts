#!/usr/bin/env node

import { argv } from 'yargs'

import { getVersion } from './version/version'

if (argv.v || argv.version) {
  console.log(`v${getVersion()}`)
  process.exit(0)
}

// tslint:disable-next-line
require('./main').bootstrap()
