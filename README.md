# CycleCheck API Server

API server backend for the [CycleCheck](https://github.com/cyclecheck/cyclecheck) app, powered by [Nest](https://nestjs.com).

![CircleCI branch](https://img.shields.io/circleci/project/github/cyclecheck/api-server/master.svg?label=release%20build) ![CircleCI (all branches)](https://img.shields.io/circleci/project/github/cyclecheck/api-server.svg) ![GitHub](https://img.shields.io/github/license/cyclecheck/api-server-docker.svg)

![GitHub release](https://img.shields.io/github/release/cyclecheck/api-server-docker.svg?label=gh-release) ![GitHub commits since latest release](https://img.shields.io/github/commits-since/cyclecheck/api-server-docker/latest/master.svg)

[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/) [![dependencies Status](https://david-dm.org/cyclecheck/api-server/status.svg)](https://david-dm.org/cyclecheck/api-server) [![devDependencies Status](https://david-dm.org/cyclecheck/api-server/dev-status.svg)](https://david-dm.org/cyclecheck/api-server?type=dev)

CycleCheck is an app for determining whether or not you should ride your bike. It gets the current weather forecast, and calculates a 'CycleScore' based on weather conditions and your preferences.

This repository houses the API server, written in TypeScript and [Nest](https://nestjs.com). It is designed to be run inside of a Docker container, and there is a prebuilt Docker image [jordond/cyclecheck-api](https://cloud.docker.com/u/jordond/repository/docker/jordond/cyclecheck-api) and the matching [repo](https://github.com/cyclecheck/api-server-docker). Instructions for running in a docker container can be found [here](https://github.com/cyclecheck/api-server-docker/blob/master/README.md#running).

It can also be ran using Node, see instructions below.

## Installation

This repository creates a single bundled executable using [pkg](). Running this requires a very specific version of Node, and if you don't plan on using the Docker container, it is recommended to use the Node method instead.

### Docker

See [here](https://github.com/cyclecheck/api-server-docker/blob/master/README.md#running).

### Node

1. Download the latest `cyclecheck-api` [release](https://github.com/cyclecheck/api-server/releases).
1. Unzip `cyclecheck-api.zip`.
1. Change into the directory.
1. Run `npm install --production`

## Setup

### Prerequisites

The following is required in order to run the api.

- Google Places API key, see [here](https://developers.google.com/places/web-service/get-api-key)
- DarkSky.net API key, see [here](https://darksky.net/dev/account)

These must be saved into your `cyclecheck.env` file, see [sample config](https://github.com/cyclecheck/api-server/blob/master/cyclecheck.sample.env).

### Config

CycleCheck-API expects a `cyclecheck.env` file in order to run. See the [sample config](https://github.com/cyclecheck/api-server/blob/master/cyclecheck.sample.env) for more information.

It must be placed in `process.cwd()` or you can set the environment variable `ENV_PATH`.

## Running

### Docker

1. When creating the docker container, make sure you mapped the `/data` directory to a folder on your machine, and map a port.
1. Add your `cyclecheck.env` to the mapped `/data` folder.
1. Start your container.
1. API server will be available at `127.0.0.1:<PORT>` where `<PORT>` is the mapped port you chose.

### Using Node

1. Follow the Installation steps above.
1. Change into the `cyclecheck-api` folder.
1. Create your `cyclecheck.env` file.
1. Run `node dist/main.js`.
1. API will be available at `localhost:3000` by default.
   - Change `PORT` in the config file to change the port.

## Contributing

See [CONTRIBUTING](https://github.com/cyclecheck/api-server/blob/master/.github/CONTRIBUTING.md).

## License

```text
MIT License

Copyright (c) 2019 CycleCheck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
