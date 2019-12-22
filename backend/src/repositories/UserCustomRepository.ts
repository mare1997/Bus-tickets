import {
    EntityRepository,
    Repository,
    UpdateResult,
    DeleteResult,
    InsertResult
} from "typeorm";
import {User} from "../entity/User";

@EntityRepository(User)
export class UserCustomRepository extends Repository<User> {

    public async getUserByUsername(userName: String): Promise<User>{
        return this.findOne({
            select: ["id", "firstName", "lastName", "userName", "password","age"],
            where: {userName}
        })
    }
}