import dotenv from "dotenv";

dotenv.config();

import app from "./app";
import { createKafkaConsumer } from "./events/consumer";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await createKafkaConsumer();

    app.listen(PORT, () => {
      console.log(`Gateway service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start gateway service:", error);
    process.exit(1);
  }
};

startServer();
