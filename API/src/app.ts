//  Todos os registros de rotas http deveram ser crriados aqui
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt"
import multipart from '@fastify/multipart'
import fastifyCookie from "@fastify/cookie";
import fastifyStatic from "@fastify/static"
import cors from "@fastify/cors"

import { env } from "./lib/env";
import { usersRroutes } from "./http/controllers/users/routes";
import { petsRoutes } from "./http/controllers/pets/routes";
import { resolve } from "path";


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

app.register(multipart)

app.register(fastifyStatic, {
    root: resolve(__dirname, './upload'),
    prefix: '/upload'
})

app.register(fastifyCookie)

app.register(cors, {
    origin: true,
})

app.register(usersRroutes, {
    prefix: 'user', 
})

app.register(petsRoutes, {
    prefix: 'pet'
})