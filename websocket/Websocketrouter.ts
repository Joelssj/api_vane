import { Server, Socket } from "socket.io";

import { MysqlSensorRepository } from "../sensor/infrastructure/MysqlSensorRepository";

const connectedClients: Set<Socket> = new Set();
const sensorRepository = new MysqlSensorRepository();

export function handleWebSockets(io: Server) {
  io.on("connection", async (socket: Socket) => {
    console.log("Un usuario conectado!");

    connectedClients.add(socket);

    await emitLast12DataToClient(socket);

    socket.on("disconnect", () => {
      console.log("Un usuario se desconectó!");
      connectedClients.delete(socket);
    });
  });

  setInterval(async () => {
    await emitLast12DataToClients();
  }, 5000);
}

async function emitLast12DataToClients() {
  const last12SensorData = await sensorRepository.getAll();

  if (last12SensorData) {
    const jsonData = JSON.stringify(last12SensorData);
    for (const clientSocket of connectedClients) {
      clientSocket.emit("sen_data", jsonData);
    }
  }
}

async function emitLast12DataToClient(socket: Socket) {
  const last12SensorData = await sensorRepository.getAll();

  if (last12SensorData) {
    const jsonData = JSON.stringify(last12SensorData);
    socket.emit("sen_data", jsonData);
  }
}

/*import { Server, Socket } from "socket.io";
import { MysqlSensorRepository } from "../sensor/infrastructure/MysqlSensorRepository";

// Mantener una lista de sockets (clientes) conectados
const connectedClients: Set<Socket> = new Set();
const sensorRepository = new MysqlSensorRepository();

export function handleWebSockets(io: Server) {
  io.on("connection", async (socket: Socket) => {
    console.log("Un usuario conectado!");

    // Agregar el socket (cliente) a la lista de clientes conectados
    connectedClients.add(socket);

    // Emitir todos los datos al cliente cuando se conecte
    await emitAllDataToClients();

    // Escucha el evento "disconnect" del cliente
    socket.on("disconnect", () => {
      console.log("Un usuario se desconecto!");

      // Remover el socket (cliente) de la lista de clientes conectados
      connectedClients.delete(socket);
    });
  });

  // Llamar a la función emitAllDataToClients cada 5 segundos
  setInterval(async () => {
    await emitAllDataToClients();
  }, 5000);
}

// Función para obtener y emitir todos los datos actualizados a todos los clientes conectados
async function emitAllDataToClients() {
  // Obtener todos los datos de la base de datos
  const allSensorData = await sensorRepository.getAll();

  // Envía todos los datos al cliente cuando se conecte
  if (allSensorData) {
    const jsonData = JSON.stringify(allSensorData);
    for (const clientSocket of connectedClients) {
      clientSocket.emit("sen_data", jsonData);
    }
  }
}*/
