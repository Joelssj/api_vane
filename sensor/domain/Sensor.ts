export class Sensor {
  constructor(
    readonly id: number,
    readonly temperatura: number,
    readonly humedad: number,
    readonly luz: number,
    readonly comida: number,
    readonly fecha: Date,
    readonly hora: string
  ) {}
}
