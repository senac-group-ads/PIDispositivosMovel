import { makeDeletPetsUseCase } from "@/application/use-cases/factories/pets/make-deletePet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePet(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const petIdSchema = z.object({
        id: z.string()
    })
    const { id } = petIdSchema.parse(request.params)

    try {

        const makePetDelet = makeDeletPetsUseCase()
        await makePetDelet.execute({ id })

        return reply.status(201).send({message: 'Pet deletado com sucesso!'})

    } catch (err) {
        return reply.status(401).send({ message: err })
    }
}