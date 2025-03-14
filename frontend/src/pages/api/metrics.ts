import client from "prom-client"
import type { NextApiRequest, NextApiResponse } from "next"

const register = new client.Registry()
client.collectDefaultMetrics({ register })

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    res.setHeader("Content-Type", register.contentType)
    const metrics = await register.metrics()  // ✅ Suppression de `.then()`, ajout de `await`
    res.send(metrics)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch metrics", details: error })
  }
}
