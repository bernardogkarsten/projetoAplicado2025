import { createServer } from "miragejs";
import { configurarRotasUsuarios } from "./usuarios";

export function makeServer() {
  return createServer({
    routes() {
      configurarRotasUsuarios(this);
    },
  });
}
