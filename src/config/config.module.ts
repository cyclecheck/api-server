import { Module } from '@nestjs/common'
import { ConfigService } from './config.service'
import { getEnvFilename } from './environment'

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(getEnvFilename()),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
