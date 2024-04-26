import { IncorrectUserPassword } from "@/application/use-cases/erros/incorrectPassword";
import { UnexistUser } from "@/application/use-cases/erros/unexistUser";
import { makeAuthenticateUseCase } from "@/application/use-cases/factories/users/make-authenticate-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const autheBodySchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    const { email, password } = autheBodySchema.parse(request.body)

    try{
        const makeAuthen = makeAuthenticateUseCase()

        const user = await makeAuthen.execute({ email, password })

        const token = await reply.jwtSign(
            {
                name: user.name,
                email: user.email,
                role: user.role
            },
            {
                sub: user.id,
            })
        
        const refreshToken = await reply.jwtSign(
            {
                name: user.name,
                email: user.email,
                role: user.role
            },
            {
                sub: user.id,
                expiresIn: '7d'
            }
        )

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                sameSite: true,
                httpOnly: true,
            })
            .status(200)
            .send({
                token,
            })
    } catch(err) {
        if (err instanceof IncorrectUserPassword) {
            return reply.status(400).send({message: err.message})
        }
        if (err instanceof UnexistUser) {
            return reply.status(400).send({message: err.message})
        }

        return reply.status(500)
    }
}