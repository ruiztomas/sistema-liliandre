import { Router } from "express";
import { getResumenReportes } from "../controllers/reportes.controller";

console.log("Rutas de reportes cargadas");
const router = Router();

router.get("/resumen", getResumenReportes);

export default router;