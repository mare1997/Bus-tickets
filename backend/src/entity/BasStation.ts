import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Location } from "./Location";
import { Station } from "./Station";

@Entity()
export class BasStation{
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
    latitude: number;

    @Column()
    longitude: number;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @ManyToOne(type => Location, location => location.basstation)
    location: Location;

    @OneToMany(type => Station, station => station.basStation)
    station: Station[];
}