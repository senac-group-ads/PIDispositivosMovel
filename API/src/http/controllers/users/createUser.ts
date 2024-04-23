import { Role } from "@/application/entities/users";
import { makeCreateUserUseCase } from "@/application/use-cases/factories/make-createuser-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function createUser(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const createUserSchema = z.object({
        name: z.string(), 
        email: z.string(), 
        password: z.string(), 
        numero: z.string(), 
        cep: z.string(), 
        roleBody: z.string(),
        contato: z.string(), 
        avataBody: z.string().optional()
    })

    const { name, email, password, cep, numero, roleBody, contato, avataBody } = createUserSchema.parse(request.body)
    let avata: string | null = ''
    if(avataBody === undefined) {
        avata = null
    } else {
        avata = avataBody
    }

    let role: Role
    if (roleBody === 'ong') {
        role = Role.ong
    } else {
        role = Role.costumer
    }

    try {
        const makeCreateUser = makeCreateUserUseCase()

        const user = await makeCreateUser.execute({
            name,
            email,
            password,
            cep,
            numero,
            role,
            contato,
            avata
        })

        return reply.status(200).send({ user })
    } catch( err ) {
        return reply.status(400).send({ message: err})
    }
}