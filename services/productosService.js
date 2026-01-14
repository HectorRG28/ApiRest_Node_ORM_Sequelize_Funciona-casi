import { Productos } from "../models/productos.js";

export const productosService = {
    findAll: async () => await Productos.findAll(),
    findByPk: async (id) => await Productos.findByPk(id),
    create: async (data) => await Productos.create(data),
    update: async (id, data) => {
        const item = await Productos.findByPk(id);
        return item ? await item.update(data) : null;
    },
    delete: async (id) => {
        const item = await Productos.findByPk(id);
        return item ? await item.destroy() : null;
    }
};