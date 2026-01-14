import { Log } from "../models/log.js";

export const requestLogger = async (req, res, next) => {
  try {
    const mensaje = `${req.method} en la ruta: ${req.originalUrl}`;
    
    // Guardamos el log en la base de datos automáticamente
    await Log.create({ log: mensaje });
    
    console.log(`📝 Log guardado: ${mensaje}`);
    
    // next() es vital: permite que la petición siga hacia el controlador
    next(); 
  } catch (error) {
    console.error("❌ Error en el logger:", error);
    next(); // Seguimos aunque falle el log para no bloquear la API
  }
};