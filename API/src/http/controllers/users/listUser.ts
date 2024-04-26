import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListUserUseCase } from '../../../application/use-cases/factories/users/make-list-user-use-case'

export async function listUser(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {

        const makeListUser = makeListUserUseCase()

        const { user } = await makeListUser.execute()

        return reply.status(200).send({ user })

    } catch( err ) {
        return reply.status(400).send({ message: err})
    }
}