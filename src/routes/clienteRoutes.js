import express from "express";
import clienteController from "../controllers/clienteController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const clienteRouter = express.Router();

clienteRouter.use(authMiddleware);

clienteRouter.get("/", clienteController.read);
clienteRouter.get("/:id", clienteController.readById);
clienteRouter.post("/", clienteController.create);
clienteRouter.put("/:id", clienteController.update);
clienteRouter.delete("/:id", clienteController.delete);

export default clienteRouter;