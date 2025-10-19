import {app} from "../../server.js"
import jwt from "jsonwebtoken"
import { supabase } from "../../lib/supabaseClient.js";

class AuthService{
  private app

  constructor(app : any) {
    this.app = app;
  }

  async login(email: string, password: string) {
    const jwt_secret = process.env.JWT_SECRET as string;

    if (!email || !password) {
      throw new Error("Preencha todos os campos");
    }

    // Busca usuário apenas pelo email
    const {data :user , error} = await supabase
        .from('users')
        .select('id,name,email,password')
        .eq('email', email)
        .eq('password', password)
        .maybeSingle()

    if (error || !user) {
      throw new Error("Email ou senha incorretos");
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      jwt_secret,
      { expiresIn: "12h" }
    );

    return {
      token,
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export {AuthService}