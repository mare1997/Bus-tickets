import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { BusStation } from "./BusStation";
import { Ticket } from "./Ticket";
import { Traveling } from "./Traveling";

@Entity()
export class Station {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: string;
    
    @Column({type: "boolean", default: false})
    deleted: boolean;

    @ManyToOne(type => BusStation, busStation => busStation.station)
    busStation: BusStation;

    @ManyToOne(type => Traveling, traveling => traveling.station)
    traveling: Traveling;
}