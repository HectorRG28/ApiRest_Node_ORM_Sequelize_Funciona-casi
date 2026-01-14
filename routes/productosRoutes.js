import express from "express";
import { productosController } from "../controllers/productosController.js";

const router = express.Router();

router.get("/", productosController.obtenerTodos);
router.get("/:id", productosController.obtenerUno);
router.post("/", productosController.crear);
router.put("/:id", productosController.actualizar);
router.delete("/:id", productosController.eliminar);

export default router;