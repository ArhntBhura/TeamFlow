import express from "express";
import cors from "cors";

import healthRouter from "./routes/heath.routes.ts";
import userRouter from "./routes/user.routes.ts";
import projectRouter from "./routes/project.routes.ts";

import { errorHandler } from "./middleware/errorHandler.ts";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);

app.use(errorHandler);

export default app;