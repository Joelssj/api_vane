import { CreateSensorUseCase } from "../application/CreateSensorUseCase";
import { GetAllSensorUseCase } from "../application/GetAllSensorUseCase";
import { GetByIdSensorUseCase } from "../application/GetByIdSensorUseCase";
import { CreateSensorController } from "./controllers/CreateSensorController";
import { GetAllSensorController } from "./controllers/GetAllSensorController";
import { GetByIdSensorController } from "./controllers/GetByIdSensorController";
import { MysqlSensorRepository } from "./MysqlSensorRepository";

export const mysqlSensorRepository = new MysqlSensorRepository();
export const createSensorUseCase = new CreateSensorUseCase(
  mysqlSensorRepository
);
export const getAllUseCase = new GetAllSensorUseCase(mysqlSensorRepository);
export const getByIdSensorUseCase = new GetByIdSensorUseCase(
  mysqlSensorRepository
);
export const createSensorController = new CreateSensorController(
  createSensorUseCase
);
export const getAllSensorController = new GetAllSensorController(getAllUseCase);
export const getByIdSensorController = new GetByIdSensorController(
  getByIdSensorUseCase
);
