import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Seats } from "./Seats";
import { Passenger } from "./Passenger";
import { Station } from "./Station";
import { Rideing } from "./Rideing";

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @OneToOne(type => Seats, seats => seats.ticket)
    @JoinColumn() 
    seats: Seats;

    @OneToOne(type => Passenger, passenger => passenger.ticket)
    passenger: Passenger;

    @ManyToOne(type => Rideing, rideing => rideing.ticket)
    rideing: Rideing;

}