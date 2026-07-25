import { Kafka } from "kafkajs";
import { env } from "../config/env";
import { updateOrder } from "../services/order.service";
import type { PaymentStatus } from "../interfaces/index.interface";

export const startOrderEventConsumer = async (): Promise<void> => {
  if (!env.KAFKA_BROKER) return;
  const kafka = new Kafka({ clientId:`${env.KAFKA_CLIENT_ID}-consumer`, brokers:[env.KAFKA_BROKER] });
  const consumer = kafka.consumer({ groupId:env.KAFKA_GROUP_ID });
  await consumer.connect();
  await consumer.subscribe({ topic:env.KAFKA_PAYMENT_TOPIC, fromBeginning:false });
  await consumer.run({ eachMessage: async ({ message }) => {
    if (!message.value) return;
    try {
      const event = JSON.parse(message.value.toString()) as { event?:string; data?:{orderId?:string; status?:PaymentStatus} };
      if (event.event === "payment.updated" && event.data?.orderId && event.data.status) await updateOrder(event.data.orderId, { paymentStatus:event.data.status });
    } catch (error) { console.error("Failed to process payment event", (error as Error).message); }
  } });
};
