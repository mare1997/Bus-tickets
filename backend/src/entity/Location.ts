import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Carrier } from "./Carrier";
import { User } from "./User";
import { BusStation } from "./BusStation";

@Entity()
export class Location {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    zip_code: string;

    @Column({type: "boolean", default: false})
    deleted: boolean;

    @OneToMany(type => Carrier, carrier => carrier.location)
    carrier: Carrier[];

    @OneToMany(type => User, user => user.location)
    user: User[];

    @OneToMany(type => BusStation, busstation => busstation.location)
    busstation: BusStation[];

}