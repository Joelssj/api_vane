import { Request, Response } from "express";

import { GetByIdSensorUseCase } from "../../application/GetByIdSensorUseCase";

export class GetByIdSensorController {
  constructor(readonly getByIdSensorUseCase: GetByIdSensorUseCase) {}

  async run(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);
    try {
      const sensor = await this.getByIdSensorUseCase.run(id);

      if (sensor)
        // Code HTTP: 200 -> Consulta exitosa
        res.status(200).send({
          status: "success",
          data: {
            id: sensor.id,
            temperatura: sensor.temperatura, // Modifica el nombre del atributo a temperatura
            humedad: sensor.humedad, // Incluye la humedad
            luz: sensor.luz, // Incluye la luz
            comida: sensor.comida, // Incluye la comida
            fecha: sensor.fecha, // Incluye la fecha
            hora: sensor.hora, // Incluye la hora
          },
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrió algún problema",
        });
    } catch (error) {
      // Code HTTP: 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrió un error",
        msn: error,
      });
    }
  }
}
