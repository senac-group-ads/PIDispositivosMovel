import { makeListUserForIdUseCase } from "@/application/use-cases/factories/make-list-user-for-id-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function profile(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const profileUser = makeListUserForIdUseCase()
        const id = request.user.sub

        const { user } = await profileUser.execute({ id })

        return reply.status(200).send({
            user
        })
    } catch (err) {
        return reply.status(400).send({ message: err})
    }
}