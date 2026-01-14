import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Producto = sequelize.define("Productos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
// En models/productos.js
nombre: {
  type: DataTypes.STRING,
  allowNull: false,
  validate: {
    notEmpty: { msg: "El nombre no puede estar vacío" },
    len: [3, 50] // Mínimo 3 caracteres, máximo 50
  }
},
precio: {
  type: DataTypes.FLOAT,
  allowNull: false,
  validate: {
    isFloat: true,
    min: { args: [0.01], msg: "El precio debe ser mayor que cero" }
  }
}
  
});
