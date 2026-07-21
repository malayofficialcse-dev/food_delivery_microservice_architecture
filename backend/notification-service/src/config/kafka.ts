import { Kafka, Producer, Consumer } from "kafkajs";

const kafka = new Kafka({
    clientId: "notification-service",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

export const producer: Producer = kafka.producer();

export const consumer: Consumer = kafka.consumer({
    groupId: "notification-group",
});

export const connectProducer = async (): Promise<void> => {
    try {
        await producer.connect();
        console.log("Kafka producer connected");
    } catch (error) {
        console.error("Kafka producer connection failed");
        console.error(error);
    }
};

export const connectConsumer = async (): Promise<void> => {
    try {
        await consumer.connect();

        const topics = [
            "order.created",
            "order.cancelled",
            "payment.success",
            "payment.failed",
            "user.registered",
            "delivery.assigned",
            "delivery.completed",
            "notification.send",
        ];

        for(const topic of topics) {
            await consumer.subscribe(
                {
                    topic,
                    fromBeginning:false,
                }
            )
        }

        console.log("Kafka connected successfully");
    } catch (error) {
        console.error(error);
    }
}