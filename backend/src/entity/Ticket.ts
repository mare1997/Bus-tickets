import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Seats } from "./Seats";
import { Passenger } from "./Passenger";
import { Station } from "./Station";
import { Traveling } from "./Traveling";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @ManyToOne(type => Seats, seats => seats.ticket)
    seats: Seats;

    @OneToOne(type => Passenger, passenger => passenger.ticket)
    passenger: Passenger;

    @ManyToOne(type => Traveling, traveling => traveling.ticket)
    traveling: Traveling;

}