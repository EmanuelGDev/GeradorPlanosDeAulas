import type { FastifyInstance } from "fastify";
import { controller } from "./Controller.js";

const controllerInstance = new controller();

async function classPlanRoutes(fastify: FastifyInstance){

    fastify.get('/:user_email', (request, reply) => {
        controllerInstance.listarPlanosDeAula(request, reply);
    })

    fastify.post('/criar-planos-de-aulas', async (request, reply) => {
        controllerInstance.criarPlanoDeAula(request, reply);
    })
}

export { classPlanRoutes };