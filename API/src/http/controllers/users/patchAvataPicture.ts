import { makePatchAvataPicture } from "@/application/use-cases/factories/users/make-patchAvataPicture-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function patchAvataPicture(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const avataSchema = z.object({
        avata: z.string().url()
    })
    const id = request.user.sub

    const { avata } = avataSchema.parse(request.body)

    try {
        const makePatchAvata = makePatchAvataPicture()
        const user = await makePatchAvata.execut({
            avata,
            id
        })

        return reply.status(200).send(user)
    } catch (err) {
        return reply.status(400).send({message: err})
    }

}