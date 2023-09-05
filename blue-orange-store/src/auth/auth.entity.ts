import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail } from 'class-validator';

export class LocalAuth {
  email: string;
  password: string;
}

@Entity('o_auth')
export class OAuth {
  @PrimaryColumn({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  google: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  facebook: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  github: string | null;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  // relations
}
