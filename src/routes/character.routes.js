import express from "express";
import { actulizarPer, crearPersonaje, eliminacion, obtenerPorId, obtenerTodosLosPersonajes } from "../controllers/character.controllers.js";
const router = express.Router();

router.get("/characters", obtenerTodosLosPersonajes);
router.get("/characters", obtenerPorId);
router.post("/characters", crearPersonaje);
router.put("/characters", actulizarPer);
router.delete("/characters", eliminacion);

export default router;