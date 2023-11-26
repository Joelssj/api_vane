import { Sensor } from "../domain/Sensor";
import { SensorRepository } from "../domain/SensorRepository";

export class GetByIdSensorUseCase {
  constructor(readonly sensorRepository: SensorRepository) {}

  async run(id: number): Promise<Sensor | null> {
    try {
      const result = await this.sensorRepository.getById(id);
      return result;
    } catch (error) {
      return null;
    }
  }
}
