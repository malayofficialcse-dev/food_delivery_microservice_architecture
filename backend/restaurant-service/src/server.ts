import app from "./app";
import { connectDB } from "./config/db";
import { createKafkaConsumer } from "./events/consumer";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5004;

const startServer = async () => {
  try {
    await connectDB();
    await createKafkaConsumer();

    app.listen(PORT, () => {
      console.log(`Restaurant service running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start restaurant service", error);
    process.exit(1);
  }
};

startServer();
