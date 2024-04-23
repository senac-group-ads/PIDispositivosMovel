//  Todos os registros de rotas http deveram ser crriados aqui
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors"

import { env } from "./lib/env";
import { usersRroutes } from "./http/controllers/users/routes";


export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: 'refreshToken',
        signed: false
    },
    sign: {
        expiresIn: '60m'
    },
})

app.register(fastifyCookie)

app.register(cors, {
    origin: true,
  })

app.register(usersRroutes)