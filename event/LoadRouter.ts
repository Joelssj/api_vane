/*import amqp from "amqplib";
import express from "express";

const config = {
  protocol: "amqp",
  hostname: "52.86.0.107",
  port: 5672,
  username: "guest",
  password: "guest",
};

export const loadRouter = express.Router();

loadRouter.get("/", async function sensorRouter(req, res) {
  const conn = await amqp.connect(config);
  console.log("Conexión exitosa");
  const channel = await conn.createChannel();
  console.log("Canal creado exitosamente");
  await channel.sendToQueue("raspberry", Buffer.from("MENSAJE"));
  console.log("Mensaje enviado");
  await channel.close();
  await conn.close();
  res.status(200).send("OK");
});*/
