import { YouAreNotAOngError } from "@/application/use-cases/erros/YouAreNotAOngError";
import { UnexistUser } from "@/application/use-cases/erros/unexistUser";
import { makeCreatePetsUseCase } from "@/application/use-cases/factories/pets/make-createPets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createPets(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const createPetSchema = z.object({
        name: z.string(),
        idade: z.string(),
        peso: z.string().optional(),
        tipo: z.string().optional(),
        descricao: z.string().optional(),
        porte: z.string().optional(),
        requisitos: z.string().optional(),
        fotos: z.array(z.string()).optional(),
        petAdotado: z.boolean().optional()
    })

    const id = request.user.sub

    const { name, idade, tipo, requisitos, porte, peso, fotos, descricao, petAdotado } = createPetSchema.parse(request.body)

    try {
        const makeCreatePet = makeCreatePetsUseCase()
        const { pets } = await makeCreatePet.execut({
            costumerId: id,
            name,
            idade,
            descricao,
            fotos,
            peso,
            petAdotado,
            porte,
            requisitos,
            tipo
        })

        return reply.status(200).send( {
            pets: {
                ...pets,
                createdAt: undefined,
                updatedAt: undefined,
                adotado: undefined
            }
        } )
    } catch(err) {
        if (err instanceof UnexistUser ) {
            return reply.status(400).send({ message: err.message })
        }

        if (err instanceof YouAreNotAOngError) {
            return reply.status(400).send({ message: err.message })
        }
        return reply.status(500).send({
            message: 'erro inesperado',
            log: err
        })
    }
}