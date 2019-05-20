import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: join(configService.config.dataDir, 'cyclecheck.db'),
        logging: true,
        entities: [],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
