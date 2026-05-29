import express from "express";
import turnosRoutes from "./routes/turnos.routes";
import servicioRoutes from "./routes/servicio.routes";

const app = express();

app.use(express.json());
app.use("/api/turnos", turnosRoutes);
app.use("/api/servicios", servicioRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});