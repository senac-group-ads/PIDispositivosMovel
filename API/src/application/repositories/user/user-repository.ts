import { User } from "../../entities/users";
/*
* classe de repositório responsável por controlar os métodos dos repositórios e abstrair os casos de uso de serem dependentes.
*/
export abstract class UserRepository {
    abstract creat(user: User): Promise<User>
}