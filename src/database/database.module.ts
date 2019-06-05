import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'

import { AdminEntity } from '../admin/admin.entity'
import { TokenEntity } from '../admin/token/token.entity'
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
          entities: [AdminEntity, TokenEntity, PlaceEntity],
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
