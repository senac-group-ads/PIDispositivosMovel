import { FastifyRequest, FastifyReply } from 'fastify'
import admin from 'firebase-admin'

const  serviceAccount = require('../../../firebase-key.json')

const BUCKET = 'pjasistarefas.appspot.com'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: BUCKET
})

const bucket = admin.storage().bucket()

export async function ImageController(request: FastifyRequest, reply: FastifyReply) {
    const file = await request.file()

    if(!file) {
        throw new Error('Sem anexo')
    }

    let random
    for(let i = 0; i <6; i++) {
        i == 0 ? random = Math.floor(Math.random() *10).toString() : random += Math.floor(Math.random() * 10).toString()
    }

    const fullName = file.filename
    const newFileName = fullName.replace(/\s/g, '')
    const name = `${random}-${newFileName}`

    const arquivo = bucket.file(name)

    const stream = arquivo.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    })

    stream.on("error", (e) => {
        console.error(e)
    })

    stream.on("finish", async () => {
        await arquivo.makePublic()
    })
    const firebaseURL = `https://storage.googleapis.com/${BUCKET}/${name}`
    
    stream.end(await file.toBuffer())
    
    return reply.status(200).send(firebaseURL)
}