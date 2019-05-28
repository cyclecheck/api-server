import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { PlaceEntity } from '../location/place.entity'

export const DATABASE_NAME = 'cyclecheck.db'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbName = configService.isDev
          ? DATABASE_NAME.replace('.db', '-dev.db')
          : DATABASE_NAME

        return {
          type: 'sqlite',
          database: join(configService.config.dataDir, dbName),
          logging: configService.isDev,
          synchronize: true,
          entities: [PlaceEntity],
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
