import { FastifyReply, FastifyRequest } from 'fastify'
import { makeListUserOngUseCase } from '../../../application/use-cases/factories/users/make-list-user-ong-use-case'

export async function listUserOng(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {

        const makeListUser = makeListUserOngUseCase()

        const { user } = await makeListUser.execute()

        return reply.status(200).send({ user })

    } catch( err ) {
        return reply.status(400).send({ message: err})
    }
}