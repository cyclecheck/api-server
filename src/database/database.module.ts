import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import entities from './entitites'

export const DATABASE_NAME = 'cyclecheck.db'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbName = configService.isDevMode
          ? DATABASE_NAME.replace('.db', '-dev.db')
          : DATABASE_NAME

        return {
          type: 'sqlite',
          database: join(configService.config.dataDir, dbName),
          logging: configService.isDevMode,
          synchronize: true,
          entities,
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
