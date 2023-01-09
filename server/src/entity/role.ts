import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  public id!: number

  @Column()
  public name!: string
}
