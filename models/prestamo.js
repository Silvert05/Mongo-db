const mongoose = require('mongoose');

const PrestamoSchema = new mongoose.Schema({
  codSocio: { type: Number, default: null },  // Cambiar de String a Number
  idVolumenes: { type: String, required: true },
  fechaPrestamo: { type: Date, required: true },
  fechaTopeDevolucion: { type: Date, required: true },
  fechaRealDevolucion: { type: Date, default: null },
  estado: { type: Number, default: 1 } // 1 = Activo, 0 = Inactivo
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);
