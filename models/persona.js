const mongoose = require("mongoose");

const personaSchema = new mongoose.Schema(
  {
    dni: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    direccion: { type: String },
    telefono: { type: String },
    cod_socio: { type: Number }, 
    estado: { type: Number, default: 1 }, // 1 = Activo, 0 = Inactivo
  },
  { timestamps: true }
);

// Crear índice único en DNI
personaSchema.index({ dni: 1 }, { unique: true });

const Persona = mongoose.model("Persona", personaSchema);
module.exports = Persona;
