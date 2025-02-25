import { client } from "../index.js";

export async function getBeauticianByEmail(data) {
  return client.db("beauty-saloon").collection("beautician").findOne(data);
}

export async function fetchBeauticianList() {
  return client.db("beauty-saloon").collection("beautician").find({}).toArray();
}

export function insertBeautician(data) {
  return client.db("beauty-saloon").collection("beautician").insertOne(data);
}

export function deleteBeauticianByEmail(data) {
  return client.db("beauty-saloon").collection("beautician").deleteOne(data);
}
