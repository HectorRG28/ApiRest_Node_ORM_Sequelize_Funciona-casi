import express from "express";
// Importamos las funciones individuales que realmente existen en el controlador
import {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/productosController.js";

const router = express.Router();

router.post("/", crearProducto);
router.get("/", obtenerProductos);
router.get("/:id", obtenerProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;