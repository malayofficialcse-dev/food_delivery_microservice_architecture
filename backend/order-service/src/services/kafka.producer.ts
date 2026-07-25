import { Kafka } from "kafkajs";
import { env } from "../config/env";
const producer = env.KAFKA_BROKER ? new Kafka({clientId:env.KAFKA_CLIENT_ID,brokers:[env.KAFKA_BROKER]}).producer() : null;
let connected=false;
export const publishOrderEvent = async (event:string,data:unknown) => { if(!producer) return; try { if(!connected){await producer.connect();connected=true;} await producer.send({topic:"order.events",messages:[{value:JSON.stringify({event,data})}]}); } catch(error){ console.error("Order event failed",(error as Error).message); } };
