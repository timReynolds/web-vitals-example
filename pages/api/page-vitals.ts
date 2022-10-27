// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { href } = req.query;

  let url = new URL(
    `https://api.tinybird.co/v0/pipes/${process.env.TINYBIRD_PIPELINE_NAME}.json?q=SELECT * FROM _ WHERE href = ${href}`
  );

  // TODO: ERROR HANDLING
  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TINYBIRD_PIPELINE_TOKEN}`,
    },
  });

  const json = await result.json();
  res.status(200).send({ data: json.data });
}
