import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Location } from "./Location";
import { Vehicle } from "./Vehicle";
import { Comment } from "./Comment";

@Entity()
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

  @Column({ type: "boolean", default: false })
  deleted: boolean;


  @ManyToOne(type => Location, location => location.carrier)
  location: Location;

  @OneToMany(type => Vehicle, vehicle => vehicle.carrier)
  vehicle: Vehicle[];

  @OneToMany(type => Comment, comment => comment.carrier)
  comment: Comment[];
}