import { Kafka } from "kafkajs";
import { env } from "../config/env";

const kafka = new Kafka({
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKER ? [env.KAFKA_BROKER] : [],
});

const producer = kafka.producer();
let producerConnected = false;

const connectProducer = async () => {
  if (!env.KAFKA_BROKER) {
    console.warn("Kafka broker is not configured, event publishing is disabled.");
    return;
  }

  if (!producerConnected) {
    await producer.connect();
    producerConnected = true;
  }
};

export const publishRestaurantEvent = async (topic: string, payload: Record<string, unknown>) => {
  if (!env.KAFKA_BROKER) {
    console.debug("Skipping Kafka publish because KAFKA_BROKER is not configured.");
    return;
  }

  try {
    await connectProducer();
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(payload) }],
    });
  } catch (error) {
    console.error("Failed to publish restaurant event:", (error as Error).message);
  }
};
