const Prestamo = require('../models/prestamo');

// Crear un nuevo préstamo
exports.createPrestamo = async (req, res) => {
  try {
    const prestamo = new Prestamo(req.body);
    const savedPrestamo = await prestamo.save();
    res.status(201).json(savedPrestamo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtener todos los préstamos activos
exports.getAllPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find({ estado: 1 });
    res.json(prestamos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un préstamo por ID
exports.getPrestamoById = async (req, res) => {
  try {
    const prestamo = await Prestamo.findById(req.params.id);
    if (!prestamo || prestamo.estado === 0) {
      return res.status(404).json({ message: 'Préstamo no encontrado o inactivo' });
    }
    res.json(prestamo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Actualizar un préstamo
exports.updatePrestamo = async (req, res) => {
  try {
    const updatedPrestamo = await Prestamo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPrestamo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Eliminar lógicamente un préstamo
exports.deletePrestamo = async (req, res) => {
  try {
    // Buscar el préstamo y actualizar su estado
    const prestamo = await Prestamo.findByIdAndUpdate(
      req.params.id,
      { estado: 0 },
      { new: true }
    );

    // Verificar si el préstamo no existe
    if (!prestamo) return res.status(404).json({ error: "Préstamo no encontrado" });

    res.json({ message: "Préstamo eliminado lógicamente", prestamo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

