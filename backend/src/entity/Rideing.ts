import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { Station } from "./Station";
import { Ticket } from "./Tickect";
import { Vehicle } from "./Vehicle";

@Entity()
export class Rideing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @OneToMany(type => Station, station => station.rideing)
    station: Station[];

    @OneToMany(type => Vehicle, vehicle => vehicle.rideing)
    vehicle: Vehicle[];
    
    @OneToOne(type => Ticket, ticket => ticket.rideing) 
    @JoinColumn()
    ticket: Ticket;

    

}