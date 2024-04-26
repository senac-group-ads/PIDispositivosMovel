import { UnexistPet } from "@/application/use-cases/erros/unexistPet";
import { makeListPetForIdUseCase } from "@/application/use-cases/factories/pets/make-listPetsForId-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPetsForId(
    request: FastifyRequest,
    reply: FastifyReply
) {
    const idPetSchema = z.object({
        id: z.string()
    })

    const { id } = idPetSchema.parse(request.params)

    try {
        const makeListPetForId = makeListPetForIdUseCase()

        const pet = await makeListPetForId.execut({ id })

        return reply.status(200).send({
            pet: {
                ...pet,
                createdAt: undefined,
                updatedAt: undefined,
            }
        })
    } catch(err) {
        if(err instanceof UnexistPet) {
            return reply.status(400).send({ message: err.message })
        }
    }
}