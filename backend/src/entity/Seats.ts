import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Vehicle } from "./Vehicle";
import { Ticket } from "./Ticket";

@Entity()
export class Seats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: number;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @ManyToOne(type => Vehicle, vehicle => vehicle.seats)
    vehicle: Vehicle;

    @OneToMany(type => Ticket, ticket => ticket.seats)
    ticket: Ticket[];
}