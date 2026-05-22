import express from "express";
import turnosRoutes from "./routes/turnos.routes";

const app = express();

app.use(express.json());
app.use("/turnos", turnosRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});