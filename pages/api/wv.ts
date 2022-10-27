// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import producer, { WEB_VITALS_TOPIC } from "../../lib/kafka";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: ERROR HANDLING
  await producer.produce(WEB_VITALS_TOPIC, req.body);
  res.status(200).send({});
}
