import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Carrier } from "./Carrier";
import { User } from "./User";

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  fullname: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column({ type: "boolean", default: false })
  deleted: boolean;

  @ManyToOne(type => Carrier, carrier => carrier.comment)
  carrier: Carrier;

  @ManyToOne(type => User, user => user.comment)
  user: User;
}