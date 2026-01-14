import { logService } from "../../services/logService.js";

export const logBaseController = {
    obtenerTodos: async (req, res) => {
        try {
            const data = await logService.findAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    obtenerUno: async (req, res) => {
        try {
            const data = await logService.findByPk(req.params.id);
            if (!data) return res.status(404).json({ mensaje: "No encontrado" });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    crear: async (req, res) => {
        try {
            const data = await logService.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    actualizar: async (req, res) => {
        try {
            const data = await logService.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ mensaje: "No encontrado" });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    eliminar: async (req, res) => {
        try {
            const result = await logService.delete(req.params.id);
            if (!result) return res.status(404).json({ mensaje: "No encontrado" });
            res.json({ mensaje: "Eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};