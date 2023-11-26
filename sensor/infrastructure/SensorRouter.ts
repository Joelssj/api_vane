import express from "express";

import {
  createSensorController,
  getAllSensorController,
  getByIdSensorController,
} from "./dependencies";

export const sensorRouter = express.Router();

sensorRouter.get("/", getAllSensorController.run.bind(getAllSensorController));
sensorRouter.get(
  "/:id",
  getByIdSensorController.run.bind(getByIdSensorController)
);
sensorRouter.post("/", createSensorController.run.bind(createSensorController));
