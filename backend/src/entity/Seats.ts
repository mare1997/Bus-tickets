import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Vehicle } from "./Vehicle";
import { Ticket } from "./Tickect";

Entity()
export class Seats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @ManyToOne(type => Vehicle, vehicle => vehicle.seats)
    vehicle: Vehicle;

    @OneToOne(type => Ticket, ticket => ticket.seats) 
    @JoinColumn()
    ticket: Ticket;
}