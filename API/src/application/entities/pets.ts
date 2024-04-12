import { Replace } from "@/lib/Replace"
import { createId } from "@paralleldrive/cuid2"

export interface IPts {
    name: string
    idade: string
    peso?: string | null
    tipo?: string | null
    descricao?: string | null
    porte?: string | null
    requisitos?: string | null
    fotos?: string[] | null
    costumerId: string
    adotado: boolean
    createdAt: Date
    updatedAt?: Date | null | undefined
}

export class Pets {
    private _id: string;
    private props: IPts;

    constructor(props: Replace<IPts,  { createdAt?: Date }>) {
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

    public get name(){
        return this.props.name
    }

    public set idade(idade: string) {
        this.props.idade = idade
    }

    public get idade(){
        return this.props.idade
    }

    public set peso(peso: string | null) {
        this.props.peso = peso
    }

    public get peso(): string | null | undefined {
        return this.props.peso
    }

    public set tipo(tipo: string | null) {
        this.props.tipo = tipo
    }

    public get tipo() : string | null | undefined  {
        return this.props.tipo
    }

    public set descricao(descricao: string | null) {
        this.props.descricao = descricao
    }

    public get descricao() : string | null | undefined {
        return this.props.descricao
    }

    public set porte(porte: string | null) {
        this.props.porte = porte
    }

    public get porte() : string | null | undefined {
        return this.props.porte
    }

    public set requisitos(requisitos: string | null) {
        this.props.requisitos = requisitos
    }

    public get requisitos() : string | null | undefined {
        return this.props.requisitos
    }

    public set fotos(fotos: string[] | null) {
        this.props.fotos = fotos
    }

    public get fotos() : string[] | null | undefined {
        return this.props.fotos
    }

    public set costumerId(costumerId: string) {
        this.props.costumerId = costumerId
    }

    public get costumerId() : string{
        return this.props.costumerId
    }

    public set adotado(adotado: boolean) {
        this.props.adotado = adotado
    }

    public get adotado(): boolean {
        return this.props.adotado
    }

    public set updatedAt(updatedAt: Date | null | undefined) {
        this.props.updatedAt = updatedAt
      }
    
      public get updatedAt(): Date | null | undefined {
        return this.props.updatedAt
      }
    
      public get createdAt(): Date {
        return this.props.createdAt
      }
}