/**
 * Rutas de eventos / events
 * host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/event");

// Todas tienen que pasar por la validación del jwt
router.use(validarJWT);

router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    validarCampos,
  ],
  crearEvento
);

// Actualizar evento
router.put("/:id", actualizarEvento);

// Borrar  evento
router.delete("/:id", eliminarEvento);

module.exports = router;
