// MysqlSensorRepository.ts

import { query } from "../../database/mysql";
import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class MysqlSensorRepository implements SensorRepository {
  async getAll(): Promise<Sensor[] | null> {
    const sql = "SELECT * FROM sensor ORDER BY fecha DESC, hora DESC LIMIT 12"; // Modificación aquí
    try {
      const [data]: any = await query(sql, []);
      const dataSensores = Object.values(JSON.parse(JSON.stringify(data)));

      return dataSensores.map(
        (sensor: any) =>
          new Sensor(
            sensor.id,
            sensor.temperatura,
            sensor.humedad,
            sensor.luz,
            sensor.comida,
            sensor.fecha,
            sensor.hora
          )
      );
    } catch (error) {
      console.error("Error al obtener datos del sensor desde MySQL:", error);
      return null;
    }
  }

  async getById(userId: number): Promise<Sensor | null> {
    const sql = "SELECT * FROM sensor WHERE id=?";
    const params: any[] = [userId];
    try {
      const [result]: any = await query(sql, params);
      // No es necesaria la validación de la cantidad de filas afectadas, ya que, al
      // estar dentro de un bloque try/catch, si hay error se captura en el catch
      return new Sensor(
        result[0].id,
        result[0].temperatura,
        result[0].humedad,
        result[0].luz,
        result[0].comida,
        result[0].fecha,
        result[0].hora
      );
    } catch (error) {
      return null;
    }
  }

  async createSensor(
    temperatura: number,
    humedad: number,
    luz: number,
    comida: number,
    fecha: Date,
    hora: string
  ): Promise<Sensor | null> {
    const sql =
      "INSERT INTO sensor (temperatura, humedad, luz, comida, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)";
    const params: any[] = [temperatura, humedad, luz, comida, fecha, hora];
    try {
      const [result]: any = await query(sql, params);
      // No es necesaria la validación de la cantidad de filas afectadas, ya que, al
      // estar dentro de un bloque try/catch, si hay error se captura en el catch
      return new Sensor(
        result.insertId,
        temperatura,
        humedad,
        luz,
        comida,
        fecha,
        hora
      );
    } catch (error) {
      return null;
    }
  }
}

/*import { query } from "../../database/mysql";
import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class MysqlSensorRepository implements SensorRepository {
  async getAll(): Promise<Sensor[] | null> {
    const sql = "SELECT * FROM sensor";
    try {
      const [data]: any = await query(sql, []);
      const dataSensores = Object.values(JSON.parse(JSON.stringify(data)));

      return dataSensores.map(
        (sensor: any) =>
          new Sensor(
            sensor.id,
            sensor.temperatura, // Modifica el nombre del atributo a temperatura
            sensor.humedad, // Incluye la humedad
            sensor.luz, // Incluye la luz
            sensor.comida, // Incluye la comida
            sensor.fecha, // Incluye la fecha
            sensor.hora // Incluye la hora
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(userId: number): Promise<Sensor | null> {
    const sql = "SELECT * FROM sensor WHERE id=?";
    const params: any[] = [userId];
    try {
      const [result]: any = await query(sql, params);
      // No es necesaria la validación de la cantidad de filas afectadas, ya que, al
      // estar dentro de un bloque try/catch, si hay error se captura en el catch
      return new Sensor(
        result[0].id,
        result[0].temperatura, // Modifica el nombre del atributo a temperatura
        result[0].humedad, // Incluye la humedad
        result[0].luz, // Incluye la luz
        result[0].comida, // Incluye la comida
        result[0].fecha, // Incluye la fecha
        result[0].hora // Incluye la hora
      );
    } catch (error) {
      return null;
    }
  }

  async createSensor(
    temperatura: number, // Modifica el nombre del atributo a temperatura
    humedad: number, // Incluye la humedad
    luz: number, // Incluye la luz
    comida: string, // Incluye la comida
    fecha: Date, // Incluye la fecha
    hora: string // Incluye la hora
  ): Promise<Sensor | null> {
    const sql =
      "INSERT INTO sensor (temperatura, humedad, luz, comida, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)";
    const params: any[] = [temperatura, humedad, luz, comida, fecha, hora];
    try {
      const [result]: any = await query(sql, params);
      // No es necesaria la validación de la cantidad de filas afectadas, ya que, al
      // estar dentro de un bloque try/catch, si hay error se captura en el catch
      return new Sensor(result.insertId, temperatura, humedad, luz, comida, fecha, hora);
    } catch (error) {
      return null;
    }
  }
}*/
