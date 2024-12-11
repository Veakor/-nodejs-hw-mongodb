import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const startServer = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1); // Вихід з кодом помилки
  }
};

startServer();