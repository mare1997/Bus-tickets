import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { BusStation } from "./BusStation";
import { Ticket } from "./Tickect";
import { Rideing } from "./Rideing";

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

    @ManyToOne(type => Rideing, rideing => rideing.station)
    rideing: Rideing;
}