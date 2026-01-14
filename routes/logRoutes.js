import express from "express";
import { logController } from "../controllers/logController.js";

const router = express.Router();

router.get("/", logController.obtenerTodos);
router.get("/:id", logController.obtenerUno);
router.post("/", logController.crear);
router.put("/:id", logController.actualizar);
router.delete("/:id", logController.eliminar);

export default router;