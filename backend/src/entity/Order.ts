import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany,} from "typeorm";
import { User } from "./User";
import { Ticket } from "./Ticket";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: ""})
    firstName: string;

    @Column({default: ""})
    lastName: string;

    @Column({default: ""})
    email: string;

    @Column({default: ""})
    phone: string;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @ManyToOne(type => User, user => user.order)
    user: User;

    @OneToMany(type => Ticket, ticket => ticket.order) 
    @JoinColumn()
    ticket: Ticket[];
}