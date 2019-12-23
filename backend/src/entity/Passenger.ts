import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn,} from "typeorm";
import { User } from "./User";
import { Ticket } from "./Tickect";

@Entity()
export class Passenger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => User, user => user.passenger)
    user: User;

    @OneToOne(type => Ticket, ticket => ticket.passenger) 
    @JoinColumn()
    ticket: Ticket;
}