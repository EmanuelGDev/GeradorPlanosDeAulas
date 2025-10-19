import { fastify, type FastifyInstance, type FastifyReply, type FastifyRequest } from "fastify";
import { AuthController } from "./Controller.js";
fastify

const authController = new AuthController(fastify);

async function authRoutes(fastify: FastifyInstance){

    fastify.post('/login',(request : FastifyRequest, reply : FastifyReply) => 
        authController.login(request,reply))

}

export {authRoutes}