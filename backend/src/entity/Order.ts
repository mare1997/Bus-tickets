import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany,} from "typeorm";
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

    @Column({default: ""})
    qty: string;

    @Column({default: ""})
    amount: string;

    @Column({default: ""})
    currency: string;

    @Column({default: ""})
    paymentMethod: string;
    
    @Column({default: ""})
    token: string;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @ManyToOne((type) => User, user => user.order)
    user: User;

    @OneToMany(type => Ticket, ticket => ticket.order) 
    @JoinColumn()
    ticket: Ticket[];
}