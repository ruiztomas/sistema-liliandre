import express from "express";
import turnosRoutes from "./routes/turnos.routes";
import servicioRoutes from "./routes/servicio.routes";
import profesionalRoutes from "./routes/profesional.routes";
import clienteRoutes from "./routes/cliente.routes";
import movimientoRoutes from "./routes/movimiento.routes";
import giftCardRoutes from "./routes/giftCard.routes";

const app = express();

app.use(express.json());

app.use("/api/turnos", turnosRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/profesionales", profesionalRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/movimientos", movimientoRoutes);
app.use("/api/giftcards", giftCardRoutes);

export default app;