import { logBaseController as Base } from "./base/logBaseController.js";

export const logController = {
    ...Base,
    // Puedes sobrescribir métodos aquí para personalizarlos
    obtenerTodos: async (req, res) => {
        console.log("🧠 Lógica personalizada para log");
        await Base.obtenerTodos(req, res);
    }
};