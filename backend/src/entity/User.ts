import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Location } from "./Location";
import { Passenger } from "./Passenger";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userName: string;
    
    @Column()
    password: string;
    
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column({type: "boolean", default: false})
    deleted: boolean;


    @ManyToOne(type => Location, location => location.user)
    location: Location;

    @OneToMany(type => Passenger, passenger => passenger.user)
    passenger: Passenger[];

}
