import { UnexistPet } from "@/application/use-cases/erros/unexistPet";
import { makeListPetForType } from "@/application/use-cases/factories/pets/make-listPetForType-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPetsForType(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const idPetSchema = z.object({
        type: z.string()
    })

    const { type } = idPetSchema.parse(request.query)

    try {
        const makeListPetForId = makeListPetForType()

        const pet = await makeListPetForId.execut({ type })

        return reply.status(200).send({ pet })
    } catch(err) {
        if(err instanceof UnexistPet) {
            return reply.status(400).send({ message: err.message })
        }
    }
}