import { makeListPetForUserUseCase } from "@/application/use-cases/factories/pets/make-listPetsForUser-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listPetByUser(request: FastifyRequest, reply: FastifyReply) {
    const costumerSchema = z.object({
        costumerId: z.string()
    })
    
    const { costumerId } = costumerSchema.parse(request.query)

    try {
        const makeListPetForUser = makeListPetForUserUseCase()

        const pets = await makeListPetForUser.execute({ costumerId })

        if(!pets) {
            return reply.status(200).send({ message: 'não a pets cadastrados por você' })
        }
        return reply.status(201).send(pets)
    } catch (err) {
        
    }
}