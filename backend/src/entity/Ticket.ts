import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { Seats } from "./Seats";
import { Order } from "./Order";
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

    @ManyToOne(type => Order, order => order.ticket)
    order: Order;

    @ManyToOne(type => Traveling, traveling => traveling.ticket)
    traveling: Traveling;

}