import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { generateId } from '../../util/crypto'

export interface Token {
  key: string
}

@Entity()
export class TokenEntity implements Token {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  key!: string

  constructor() {
    this.key = generateId()
  }
}
