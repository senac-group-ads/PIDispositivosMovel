import { makeUpdatePetUseCase } from "@/application/use-cases/factories/pets/make-updatePet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updatePet(
    request: FastifyRequest,
    reply: FastifyReply) {
        const updatePetSchema = z.object({
            name: z.string().optional(),
            idade: z.string().optional(),
            peso: z.string().optional(),
            tipo: z.string().optional(),
            descricao: z.string().optional(),
            porte: z.string().optional(),
            requisitos: z.string().optional(),
            fotos: z.string().optional(),
        })

        const { name, peso, idade, descricao, fotos, porte, requisitos, tipo } = updatePetSchema.parse(request.body)

        const idPetSchema = z.object({
            id: z.string()
        })

        const { id } = idPetSchema.parse(request.params)

        try {
            const makeUpdatePet = makeUpdatePetUseCase()
            await makeUpdatePet.execute({ id, name, idade, fotos, descricao, peso, porte, requisitos, tipo })

            return reply.status(201).send({message: 'Pet atualizado'})
        } catch (error) {
            reply.status(400).send({message: error})
        }
}