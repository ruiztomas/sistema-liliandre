import { Router } from "express";
import { prisma } from "../lib/prisma";
import { 
    getTurnos, 
    createTurno, 
    getTurnoById, 
    updateTurno, 
    deleteTurno,
    finalizarTurno
} from "../controllers/turno.controller";

const router = Router();

router.get("/", getTurnos);
router.get("/:id", getTurnoById);
router.post("/", createTurno);
router.put("/:id", updateTurno);
router.post("/:id/finalizar", finalizarTurno);
router.delete("/:id", deleteTurno);

export default router;