import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Location } from "./Location";
import { Station } from "./Station";

@Entity()
export class BusStation{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    street: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    worktime: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @ManyToOne(type => Location, location => location.busstation)
    location: Location;

    @OneToMany(type => Station, station => station.busStation)
    station: Station[];
}