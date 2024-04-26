import { makeListUserForIdUseCase } from "@/application/use-cases/factories/users/make-list-user-for-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUserForId(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const idSchema = z.object({
        id: z.string()
    })

    const { id } = idSchema.parse(request.params)

    try {
        const makeListUser = makeListUserForIdUseCase()
        const { user } = await makeListUser.execute({ id })

        return reply.status(200).send( user )
    } catch (err) {
        return reply.status(400).send({ message: err})
    }
}