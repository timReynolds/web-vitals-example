import { Kafka } from "@upstash/kafka";

// TODO: timreynolds Move this to a config file
const kafka = new Kafka({
  url: process.env.KAFKA_URL,
  username: process.env.KAFKA_USERNAME,
  password: process.env.KAFKA_PASSWORD,
});

export const WEB_VITALS_TOPIC = "web-vitals";
const producer = kafka.producer();

export default producer;
