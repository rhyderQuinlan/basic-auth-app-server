import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    email: string

  @Column()
    password: string

  @Column()
    firstName: string

  @Column()
    lastName: string

  @Column()
    phoneNumber: string
}
