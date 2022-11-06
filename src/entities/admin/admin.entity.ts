import {
  Entity, Column, PrimaryGeneratedColumn,
  CreateDateColumn, UpdateDateColumn, DeleteDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

import { E_AdminRole } from '@entities/role/role.enum'


@Entity('admins')
export class Admin {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'login', unique: true })
  login: string

  @Column({ name: 'email', unique: true })
  email: string

  @Column({ name: 'password' })
  @Exclude()
  password: string

  @Column({ name: 'role', type: 'enum', enum: E_AdminRole })
  role: E_AdminRole

  @Column({ name: 'name_first' })
  nameFirst: string

  @Column({ name: 'name_last' })
  nameLast: string

  @Column({ name: 'is_active', default: true })
  isActive: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date
}
