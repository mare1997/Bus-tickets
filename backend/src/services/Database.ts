import {
    createConnection,
    getCustomRepository,
    getManager,
    getConnectionManager,
    EntityManager
} from "typeorm";

import { UserCustomRepository } from '../repositories/UserCustomRepository';

export default class Database {
    public static manager: EntityManager;
    private static UserRepository: UserCustomRepository;

    public static async createConnection() {
        console.log("Connecting to DB...");
        await createConnection();
        Database.manager = getManager();
        console.log("DB connected.");
    }

    public static getUserCustomRepository() {
        if (Database.UserRepository == null) {
            Database.UserRepository = getCustomRepository(UserCustomRepository);
        }
        return Database.UserRepository;
    }
}