import express from "express";
import cors from "cors";
import turnosRoutes from "./routes/turnos.routes";
import servicioRoutes from "./routes/servicio.routes";
import profesionalRoutes from "./routes/profesional.routes";
import clienteRoutes from "./routes/cliente.routes";
import movimientoRoutes from "./routes/movimiento.routes";
import giftCardRoutes from "./routes/giftCard.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/turnos", turnosRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/profesionales", profesionalRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/movimientos", movimientoRoutes);
app.use("/api/giftcards", giftCardRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});