import { FastifyReply, FastifyRequest } from "fastify";
import { createWriteStream } from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from 'node:stream'
import { resolve } from "node:path";

const pump = promisify(pipeline)
 
export class ImageController {
    async upload(request: FastifyRequest, reply: FastifyReply) {
        const file = await request.file();

        if (file === undefined) {
            throw new Error('Erro na seleção e envio da imagem!')
        }

        let random
        for(var i = 0; i < 6; i++) {
            i == 0 ? random = Math.floor(Math.random() * 10).toString() 
            : random += Math.floor(Math.random() * 10).toString()
        }

        const fullName = file.filename
        const newFileName = fullName.replace(/\s/g, '')
        const name = `${random}-${newFileName}`

        const writeStream = createWriteStream(
            resolve(__dirname, '../../upload', name)
        )

        await pump(file.file, writeStream)

        const fullUrl = request.protocol.concat('://').concat(request.hostname).concat(':3333')

        const fileUrl = new URL(`/upload/${name}`, fullUrl).toString()

        return fileUrl
    }
}