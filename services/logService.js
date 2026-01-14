import { Log } from "../models/log.js";

export const logService = {
    findAll: async () => await Log.findAll(),
    findByPk: async (id) => await Log.findByPk(id),
    create: async (data) => await Log.create(data),
    update: async (id, data) => {
        const item = await Log.findByPk(id);
        return item ? await item.update(data) : null;
    },
    delete: async (id) => {
        const item = await Log.findByPk(id);
        return item ? await item.destroy() : null;
    }
};