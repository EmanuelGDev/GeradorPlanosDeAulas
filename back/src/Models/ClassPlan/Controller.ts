import { request } from "http";
import { service } from "./Service.js";
import type { FastifyRequest, FastifyReply } from "fastify";

const serviceInstace = new service();

class controller {

    async criarPlanoDeAula(fastifyRequest: FastifyRequest, fastifyReply: FastifyReply){
        try {
            const { tema_aula, ano_escolar, duracao_aula, disciplina, user_email } = fastifyRequest.body as {
            tema_aula: string;
            ano_escolar: string;
            duracao_aula: string;
            disciplina: string;
            user_email: string;
        };
        const resultado = await serviceInstace.createLesson(tema_aula, ano_escolar, duracao_aula, disciplina, user_email);
        return fastifyReply.status(201).send({ plano_de_aula: resultado });
        } catch (error) {
            return fastifyReply.status(400).send({ error: 'Requisição inválida' });
        }
    }

    async listarPlanosDeAula(fastifyRequest: FastifyRequest, fastifyReply: FastifyReply){
        try {
            const { user_email } = fastifyRequest.params as { user_email: string };
            const planosDeAula = await serviceInstace.listLessons(user_email);
            return fastifyReply.status(200).send({ planos_de_aula: planosDeAula });
        } catch (error) {
            return fastifyReply.status(500).send({ error: 'Erro ao listar planos de aula' });
        }
    }
}
export { controller };