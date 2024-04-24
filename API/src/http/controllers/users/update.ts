import { User } from "@/application/entities/users";
import { makeUpdateUseCase } from "@/application/use-cases/factories/make-update-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function update(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const updateSchema = z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        password: z.string().optional(),
        cep: z.string().optional(),
        numero: z.string().optional(),
        contato: z.string().optional(),
        avataBody: z.string().optional(),
    })
    const id = request.user.sub

    const { name, email, password, numero, contato, cep, avataBody } = updateSchema.parse(request.body)

    try {
        const user = new User({
            name,
            email,
            password,
            numero,
            contato,
            cep,
            avata: avataBody
        })
        const makeUpdate = makeUpdateUseCase()

        const userUpdate = await makeUpdate.execute({
            _id: id,
            user
        })

        return reply.status(200).send({ userUpdate })
    } catch(err) {
        return reply.status(400).send({ message: err})
    }
}