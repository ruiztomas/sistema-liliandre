import express from "express";
import turnosRoutes from "./routes/turnos.routes";

const app = express();

app.use(express.json());

app.use("/api/turnos", turnosRoutes);

export default app;