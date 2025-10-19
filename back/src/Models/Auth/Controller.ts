import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./Service.js";

class AuthController {
    
    private service : AuthService

    constructor(app : any){
        this.service = new AuthService(app);
    }

    async login(request: FastifyRequest, reply : FastifyReply){
        try{
            const{email, password} = request.body as {email : string, password : string}
            const logged = await this.service.login(email, password)
            return reply.code(200).send(logged)
        }
        catch(err){
            return reply.code(400).send(err);
        }
    }
}

export {AuthController}