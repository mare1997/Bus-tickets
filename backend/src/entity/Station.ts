import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { BasStation } from "./BasStation";
import { Ticket } from "./Tickect";
import { Rideing } from "./Rideing";

@Entity()
export class Station {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    time: Date;
    
    @Column({type: "boolean", default: false})
    deleted: boolean;

    @ManyToOne(type => BasStation, basStation => basStation.station)
    basStation: BasStation;

    @ManyToOne(type => Rideing, rideing => rideing.station)
    rideing: Rideing;
}