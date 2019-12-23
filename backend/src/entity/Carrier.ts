import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Location } from "./Location";
import { Vehicle } from "./Vehicle";

Entity()
export class Carrier {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    pib: string;

    @Column()
    street: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    site: string;

    @Column()
    image: string;

    @ManyToOne(type => Location, location => location.carrier)
    location: Location;

    @OneToMany(type => Vehicle, vehicle => vehicle.carrier)
    vehicle: Vehicle[];
}