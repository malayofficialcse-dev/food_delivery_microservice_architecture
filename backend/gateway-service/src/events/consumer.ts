import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || "gateway-service",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  logLevel: logLevel.INFO,
});

const consumer = kafka.consumer({ groupId: "gateway-service-group" });

export const createKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "notification.send", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const payload = message.value ? JSON.parse(message.value.toString()) : null;
        console.log(`Consumed message from ${topic}[${partition}]`, payload);
      } catch (error) {
        console.error("Failed to parse Kafka message", error);
      }
    },
  });
};
