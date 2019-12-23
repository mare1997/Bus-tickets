import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import { Carrier } from "./Carrier";
import { Seats } from "./Seats";
import { Rideing } from "./Rideing";

Entity()
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    registration_number: string;

    @Column()
    driver: string;

    @ManyToOne(type => Carrier, carrier => carrier.vehicle)
    carrier: Carrier;

    @OneToMany(type => Seats, seats => seats.vehicle)
    seats: Seats[];

    @ManyToOne(type => Rideing, rideing => rideing.vehicle)
    rideing: Rideing;
}