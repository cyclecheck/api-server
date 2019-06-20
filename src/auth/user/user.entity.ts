import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { hashString } from '../../util/crypto'

export interface AdminUser {
  username: string
  password: string
}

@Entity('admin_users')
export class AdminUserEntity implements AdminUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  username!: string

  @Column()
  password!: string

  @BeforeInsert()
  hashPassword() {
    this.password = hashString(this.password)
  }

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  compare(user: AdminUser): boolean {
    const { username, password } = user
    const hashedPassword = hashString(password)

    return this.username === username && this.password === hashedPassword
  }
}
