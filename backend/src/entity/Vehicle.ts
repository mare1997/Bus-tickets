import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Carrier } from "./Carrier";
import { Seats } from "./Seats";
import { Traveling } from "./Traveling";

@Entity()
export class Vehicle {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  registration_number: string;

  @Column()
  driver: string;

  @Column({ type: "boolean", default: false })
  deleted: boolean;

  @ManyToOne(type => Carrier, carrier => carrier.vehicle)
  carrier: Carrier;

  @OneToMany(type => Seats, seats => seats.vehicle)
  seats: Seats[];

  @OneToMany(type => Traveling, traveling => traveling.vehicle)
  traveling: Traveling[];
}