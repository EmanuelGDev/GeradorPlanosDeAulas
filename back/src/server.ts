import Fastify from 'fastify';
import { routes } from './Routes/routes.js';
import cors from "@fastify/cors";

const app = Fastify();

app.register(cors, {
  origin: ["http://localhost:8080", "https://meusite.com"],
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true,
});

app.register(routes);

const PORT = 3000;

app.listen({ port: PORT }, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

export { app };