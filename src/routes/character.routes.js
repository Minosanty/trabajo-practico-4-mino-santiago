import express from "express";
import { actulizarPer, crearPersonaje, eliminacion, obtenerPorId, obtenerTodosLosPersonajes } from "../controllers/character.controllers.js";
const router = express.Router();

router.get("/characters", obtenerTodosLosPersonajes);
router.get("/characters/:id", obtenerPorId);
router.post("/characters", crearPersonaje);
router.put("/characters/:id", actulizarPer);
router.delete("/characters/:id", eliminacion);

export default router;