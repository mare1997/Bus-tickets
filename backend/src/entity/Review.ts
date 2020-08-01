import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Carrier } from "./Carrier";
import { User } from "./User";

@Entity()
export class Review {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rollingStock: number;

  @Column()
  staff: number;

  @Column()
  accuracy: number;

  @Column()
  hygiene: number;

  @ManyToOne(type => Carrier, carrier => carrier.comment)
  carrier: Carrier;

  @ManyToOne(type => User, user => user.comment)
  user: User;
}