// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { College } from "../../interfaces/interfaces";

const { MongoClient, ServerApiVersion } = require("mongodb");

const username = encodeURIComponent(process.env.USERNAME || "");
const password = encodeURIComponent(process.env.PASSWORD || "");

const uri = `mongodb+srv://${username}:${password}@cluster0.ejlcm.mongodb.net/?retryWrites=true&w=majority`;

const getData = async (type?: string, data?: string): Promise<any> => {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  client.connect();
  const collection = client.db("oneshot").collection("college");
  switch (type) {
    case "course":
      return await collection.find({ courses: data }).toArray();
    case "city":
      return await collection.find({ city: data }).toArray();
    case "state":
      return await collection.find({ state: data }).toArray();
    case "country":
      return await collection.find({ country: data }).toArray();
  }

  return await collection.find().toArray();
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<College>>
) {
  getData(req.body.type, req.body.data).then((data) => {
    return res.status(200).json(data);
  });

  return res.status(404);
}
