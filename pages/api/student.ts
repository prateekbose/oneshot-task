// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Student } from "../../interfaces/interfaces";
const { MongoClient, ServerApiVersion } = require("mongodb");

const username = encodeURIComponent(process.env.USERNAME || "");
const password = encodeURIComponent(process.env.PASSWORD || "");

const uri = `mongodb+srv://${username}:${password}@cluster0.ejlcm.mongodb.net/?retryWrites=true&w=majority`;

const getData = async (
  type?: string,
  data?: string
): Promise<Array<Student>> => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect();
  const collection = client.db("oneshot").collection("student");

  return await collection.find().toArray();
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Student>>
) {
  getData(req.body.type, req.body.data).then((data) => {
    return res.status(200).json(data);
  });

  return res.status(404);
}
