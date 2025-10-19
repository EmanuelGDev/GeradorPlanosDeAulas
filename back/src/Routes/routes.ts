import type{ FastifyInstance } from "fastify";
import { classPlanRoutes } from "../Models/ClassPlan/Route.js";
import { authRoutes } from "../Models/Auth/Route.js";


async function routes(fastify : FastifyInstance){
    fastify.register(classPlanRoutes, { prefix : '/classPlan'})
    fastify.register(authRoutes, { prefix : '/auth'})
}

export {routes}