import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, OneToOne, JoinColumn } from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import { Location } from "./Location";
import { Order } from "./Order";
import * as bcrypt from "bcryptjs";
import { Comment } from "./Comment";
import { Review } from "./Review";
import { Carrier } from "./Carrier";

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

  @OneToMany(type => Order, order => order.user)
  order: Order[];

  @OneToMany(type => Comment, comment => comment.carrier)
  comment: Comment[];

  @OneToMany(type => Review, review => review.carrier)
  review: Review[];

  @OneToOne(type => Carrier, carrier => carrier.user) 
  @JoinColumn()
  carrier: Carrier;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
