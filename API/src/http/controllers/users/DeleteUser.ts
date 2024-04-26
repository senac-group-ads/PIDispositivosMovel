import { makeDeleteUserUseCase } from "@/application/use-cases/factories/users/make-delete-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function deleteUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const id = request.user.sub

    try {
        const makeDelete = makeDeleteUserUseCase()
        await makeDelete.execute({ id })

        return reply.status(200).send({ message: 'Usuario deletado com sucesso!' })
    } catch(err) {
        return reply.status(400).send({message: err})
    }
}