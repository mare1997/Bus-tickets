import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { Location } from "./Location";
import { Passenger } from "./Passenger";
import * as bcrypt from "bcryptjs";
import { Comment } from "./Comment";

@Entity()
@Unique(["userName"])
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

  @Column({ type: "boolean", default: false })
  deleted: boolean;

  @Column()
  @IsNotEmpty()
  role: string;

  @ManyToOne(type => Location, location => location.user)
  location: Location;

  @OneToMany(type => Passenger, passenger => passenger.user)
  passenger: Passenger[];

  @OneToMany(type => Comment, comment => comment.carrier)
  comment: Comment[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
