import fs from "fs";
import path from "path";

// Configuración de rutas
const MODELS_DIR = "./models";
const SERVICES_DIR = "./services";
const CONTROLLERS_BASE_DIR = "./controllers/base";
const CONTROLLERS_DIR = "./controllers";
const ROUTES_DIR = "./routes";

// Crear carpetas si no existen
[SERVICES_DIR, CONTROLLERS_BASE_DIR, CONTROLLERS_DIR, ROUTES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Leer modelos
const files = fs.readdirSync(MODELS_DIR).filter(f => f.endsWith(".js") && f !== "index.js");

files.forEach(file => {
    const modelName = file.replace(".js", "");
    const className = modelName.charAt(0).toUpperCase() + modelName.slice(1);

    // 1. GENERAR SERVICIO (Lógica de Datos)
    const serviceContent = `import { ${className} } from "../models/${file}";

export const ${modelName}Service = {
    findAll: async () => await ${className}.findAll(),
    findByPk: async (id) => await ${className}.findByPk(id),
    create: async (data) => await ${className}.create(data),
    update: async (id, data) => {
        const item = await ${className}.findByPk(id);
        return item ? await item.update(data) : null;
    },
    delete: async (id) => {
        const item = await ${className}.findByPk(id);
        return item ? await item.destroy() : null;
    }
};`;
    fs.writeFileSync(path.join(SERVICES_DIR, `${modelName}Service.js`), serviceContent);

    // 2. GENERAR CONTROLADOR BASE (Lógica Genérica - SIEMPRE SE SOBREESCRIBE)
    const baseControllerContent = `import { ${modelName}Service } from "../../services/${modelName}Service.js";

export const ${modelName}BaseController = {
    obtenerTodos: async (req, res) => {
        try {
            const data = await ${modelName}Service.findAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    obtenerUno: async (req, res) => {
        try {
            const data = await ${modelName}Service.findByPk(req.params.id);
            if (!data) return res.status(404).json({ mensaje: "No encontrado" });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    crear: async (req, res) => {
        try {
            const data = await ${modelName}Service.create(req.body);
            res.status(201).json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    actualizar: async (req, res) => {
        try {
            const data = await ${modelName}Service.update(req.params.id, req.body);
            if (!data) return res.status(404).json({ mensaje: "No encontrado" });
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    eliminar: async (req, res) => {
        try {
            const result = await ${modelName}Service.delete(req.params.id);
            if (!result) return res.status(404).json({ mensaje: "No encontrado" });
            res.json({ mensaje: "Eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};`;
    fs.writeFileSync(path.join(CONTROLLERS_BASE_DIR, `${modelName}BaseController.js`), baseControllerContent);

    // 3. GENERAR CONTROLADOR EXTENDIDO (SÓLO SI NO EXISTE)
    const controllerPath = path.join(CONTROLLERS_DIR, `${modelName}Controller.js`);
    if (!fs.existsSync(controllerPath)) {
        const controllerContent = `import { ${modelName}BaseController as Base } from "./base/${modelName}BaseController.js";

export const ${modelName}Controller = {
    ...Base,
    // Puedes sobrescribir métodos aquí para personalizarlos
    obtenerTodos: async (req, res) => {
        console.log("🧠 Lógica personalizada para ${modelName}");
        await Base.obtenerTodos(req, res);
    }
};`;
        fs.writeFileSync(controllerPath, controllerContent);
    }

    // 4. GENERAR RUTAS
    const routesContent = `import express from "express";
import { ${modelName}Controller } from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", ${modelName}Controller.obtenerTodos);
router.get("/:id", ${modelName}Controller.obtenerUno);
router.post("/", ${modelName}Controller.crear);
router.put("/:id", ${modelName}Controller.actualizar);
router.delete("/:id", ${modelName}Controller.eliminar);

export default router;`;
    fs.writeFileSync(path.join(ROUTES_DIR, `${modelName}Routes.js`), routesContent);

    console.log(`✅ Capas generadas para el modelo: ${modelName}`);
});