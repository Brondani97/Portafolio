const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flujoCandidatos = addKeyword('Candidatos').addAnswer('Esos son los candidatos:')
.addAnswer('Candidato1: Info del candidato')
.addAnswer('Candidato2: Info del candidato 2')
.addAnswer('Candidato 3: Info candidato 3')

const flujoinformación = addKeyword('informacion').addAnswer('Toda la info de la muncipalidad.')

const flujoYavote = addKeyword('Si').addAnswer('Muchas gracias por votar')

const flujoNovote = addKeyword('No').addAnswer('Recuerde que tiene tiempo hasta las 19:00HS, Consulte su padron para saber donde vota.')
.addAnswer('Puede consultarlo aqui: https://www.padron.gob.ar/')

const flujoNSVotar = addKeyword('No lo decido aun').addAnswer('Recuerde que tiene tiempo hasta las 19:00HS, Consulte su padron para saber donde vota.')
.addAnswer('Puede consultarlo aqui: https://www.padron.gob.ar/')

const flujoVotaciones = addKeyword('Votaciones').addAnswer('¿Usted ya voto?',{
    buttons: [
        {
            body: 'Si'
        },
        {
            body: 'No'
        },
        {
            body: 'No lo decido aun'
        },
    ]
},null,[flujoYavote,flujoNovote,flujoNSVotar])



const flujoPrincipal = addKeyword(EVENTS.WELCOME).addAnswer('Bienvenido a la municipalidad de Villa Mercedes.',{
    buttons: [
        {
            body: 'Candidatos'
        },
        {
            body: 'información'
        },
        {
            body: 'Votaciones'
        },
    ]
})



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoPrincipal,flujoVotaciones,flujoinformación,flujoCandidatos])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
