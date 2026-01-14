import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables del archivo .env

export const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    // Añadir un pool mejora la estabilidad de la conexión
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Comprobar conexión
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida con la base de datos.");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
  }
})();