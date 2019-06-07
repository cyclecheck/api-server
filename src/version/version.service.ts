import { HttpService, Injectable } from '@nestjs/common'
import { clean } from 'semver'

import { ConfigService } from '../config/config.service'
import { compare, getVersion } from './version'

const GITHUB_BASE = 'https://api.github.com/repos/'
const REPO = 'cyclecheck/api-server'
const GITHUB_PATH = '/releases/latest'

const URL = `${GITHUB_BASE}${REPO}${GITHUB_PATH}`

@Injectable()
export class VersionService {
  readonly currentVersion: string

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const { isDevMode } = this.configService
    this.currentVersion = getVersion({ isDevMode })
  }

  async getLatestVersion(): Promise<LatestRelease> {
    const result = await this.httpService
      .get<LatestReleaseResponse>(URL)
      .toPromise()

    const { tag_name, published_at } = result.data
    const difference = compare(tag_name, this.currentVersion)

    return {
      current: clean(this.currentVersion)!,
      latest: clean(tag_name)!,
      isNewer: difference !== null,
      difference: difference || '',
      published: new Date(published_at),
    }
  }
}

export interface LatestRelease {
  current: string
  latest: string
  isNewer: boolean
  difference: string
  published: Date
}

interface LatestReleaseResponse {
  tag_name: string
  published_at: string
}
