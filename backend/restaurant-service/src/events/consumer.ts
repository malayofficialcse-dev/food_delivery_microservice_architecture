import { Kafka, logLevel } from "kafkajs";
import { env } from "../config/env";

export const createKafkaConsumer = async () => {
  if (!env.KAFKA_BROKER || !env.KAFKA_CONSUMER_TOPIC) {
    console.warn("Kafka consumer disabled because broker or topic is not configured.");
    return;
  }

  const kafka = new Kafka({
    clientId: env.KAFKA_CLIENT_ID,
    brokers: [env.KAFKA_BROKER],
    logLevel: logLevel.INFO,
  });

  const consumer = kafka.consumer({ groupId: env.KAFKA_GROUP_ID });

  try {
    await consumer.connect();
    await consumer.subscribe({ topic: env.KAFKA_CONSUMER_TOPIC, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value ? message.value.toString() : null;
        console.log(`Consumed message from ${topic}[${partition}]`, value);
      },
    });
  } catch (error) {
    console.error("Unable to start Kafka consumer:", (error as Error).message);
  }
};
