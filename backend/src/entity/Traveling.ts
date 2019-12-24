import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Station } from "./Station";
import { Ticket } from "./Ticket";
import { Vehicle } from "./Vehicle";

@Entity()
export class Traveling {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @OneToMany(type => Station, station => station.traveling)
    station: Station[];

    @ManyToOne(type => Vehicle, vehicle => vehicle.traveling)
    vehicle: Vehicle;

    @OneToMany(type => Ticket, ticket => ticket.traveling) 
    ticket: Ticket[];



}