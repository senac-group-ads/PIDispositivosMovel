import { makePetAdoptedUseCase } from "@/application/use-cases/factories/pets/make-petAdopted-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function petAdopted(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const adoptedSchema = z.object({
        adotado: z.boolean()
    })

    const { adotado } = adoptedSchema.parse(request.body)

    const idSchema = z.object({
        id: z.string()
    })

    const { id } = idSchema.parse(request.params)

    try {
        const makeAdoptedPet = makePetAdoptedUseCase()
        await makeAdoptedPet.execut({id, adotado})

        return reply.status(200).send({
            message: 'Pet atualizado'
        })
    } catch( err) {
        return reply.status(400).send(err)
    }
}