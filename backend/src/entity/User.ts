import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

    @Column("integer")
    age: number;

}
