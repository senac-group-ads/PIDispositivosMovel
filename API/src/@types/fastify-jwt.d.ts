import { Role } from '@/application/entities/users'
import '@fastify/jwt'

declare module '@fastify/jwt' {
    export interface FastifyJWT {
        user: {
            sub: string
            name: string
            email: string
            role: Role
        }
    }
}