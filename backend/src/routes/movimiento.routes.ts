import { Router } from "express";
import{
    getMovimientos,
    getMovimientoById,
    createMovimiento,
    updateMovimiento,
    deleteMovimiento,
    getResumen,
} from "../controllers/movimiento.controller";

const router = Router();

router.get("/", getMovimientos);
router.get("/resumen", getResumen);
router.get("/:id", getMovimientoById);
router.post("/", createMovimiento);
router.put("/:id", updateMovimiento);
router.delete("/:id", deleteMovimiento);

export default router;