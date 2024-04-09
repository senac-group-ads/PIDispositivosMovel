import { createId } from "@paralleldrive/cuid2"
import { Replace } from "../../lib/Replace"

/* 
* Entidade de usuario com metodos geters e seters
*/

export enum Role {
    ong = "ong",
    costumer = "costumer"
}

export interface IUSer {
    name: string
    email: string
    password: string
    cep: string
    numero: string
    contato: string
    role: Role
    avata?: string | null
    createdAt: Date
    update_at?: Date | null
}

export class User {
    private _id: string;
    private props: IUSer;

    constructor(props: Replace<IUSer, { createdAt?: Date }>) {
        this._id = createId(),
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
          }
    }

    public get id() {
        return this._id
      }
    
      public set name(name: string) {
        this.props.name = name
      }
      public get name() {
        return this.props.name
      }

      public set email(email: string) {
        this.props.email = email
      }
      public get email() {
        return this.props.email
      }

      public set password(password: string) {
        this.props.password = password
      }
      public get password() {
        return this.props.password
      }

      public set cep(cep: string) {
        this.props.cep = cep
      }
      public get cep() {
        return this.props.cep
      }

      public set numero(numero: string) {
        this.props.numero = numero
      }
      public get numero() {
        return this.props.numero
      }

      public set contato(contato: string) {
        this.props.contato = contato
      }
      public get contato() {
        return this.props.contato
      }

      public set role(role: Role) {
        if(!role) {
            this.props.role = Role.costumer
        }

        this.props.role = role
      }

      public get role() {
        return this.props.role
      }

      public set avata(avata: string | null | undefined) {
        this.props.avata = avata
      }
      public get avata(): string | null | undefined {
        return this.props.avata
      }

      public set update(update: Date | null | undefined) {
        this.props.update_at = update
      }
    
      public get update(): Date | null | undefined {
        return this.props.update_at
      }
    
      public get createdAt(): Date {
        return this.props.createdAt
      }
}