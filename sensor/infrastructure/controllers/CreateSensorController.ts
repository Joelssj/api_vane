import { Request, Response } from "express";

import { CreateSensorUseCase } from "../../application/CreateSensorUseCase";

export class CreateSensorController {
  constructor(readonly createSensorUseCase: CreateSensorUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log("mensaje " + JSON.stringify(data));
    try {
      const sensor = await this.createSensorUseCase.run(
        data.temperatura, // Modifica el nombre del atributo a temperatura
        data.humedad, // Agrega la humedad
        data.luz, // Agrega la luz
        data.rellenado, // Cambia a rellenado y ajusta el tipo a number
        new Date(data.fecha), // Convierte la fecha a un objeto Date
        data.hora // Agrega la hora
      );

      if (sensor)
        // Code HTTP: 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: sensor?.id,
            temperatura: sensor?.temperatura,
            humedad: sensor?.humedad, // Incluye la humedad
            luz: sensor?.luz, // Incluye la luz
            comida: sensor?.comida, // Cambia a rellenado
            fecha: sensor?.fecha, // Incluye la fecha
            hora: sensor?.hora, // Incluye la hora
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
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

/*import { Request, Response } from "express";

import { CreateSensorUseCase } from "../../application/CreateSensorUseCase";

export class CreateSensorController {
  constructor(readonly createSensorUseCase: CreateSensorUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log("mensaje " + JSON.stringify(data));
   try {
      const sensor = await this.createSensorUseCase.run(
        data.temperatura, // Modifica el nombre del atributo a temperatura
        data.humedad, // Agrega la humedad
        data.luz, // Agrega la luz
        data.comida, // Agrega la comida
        new Date(data.fecha), // Convierte la fecha a un objeto Date
        data.hora // Agrega la hora
      );

      if (sensor)
        // Code HTTP: 201 -> Creado
        res.status(201).send({
          status: "success",
          data: {
            id: sensor?.id,
            temperatura: sensor?.temperatura,
            humedad: sensor?.humedad, // Incluye la humedad
            luz: sensor?.luz, // Incluye la luz
            comida: sensor?.comida, // Incluye la comida
            fecha: sensor?.fecha, // Incluye la fecha
            hora: sensor?.hora, // Incluye la hora
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
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
}*/
