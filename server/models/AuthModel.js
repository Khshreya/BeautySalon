import { client } from "../index.js";

export async function getDBUserByEmail(data) {
  return client.db("beauty-saloon").collection("users").findOne(data);
}

export function registerUser(data) {
  return client.db("beauty-saloon").collection("users").insertOne(data);
}

export function insertToken(data, hashedResetToken) {
  return client
    .db("beauty-saloon")
    .collection("users")
    .updateOne(data, {
      $set: { token: hashedResetToken, createdAt: new Date() },
    });
}

export function getToken(data) {
  return client.db("beauty-saloon").collection("users").findOne(data);
}

export function updatePassword(query, updateQuery) {
  return client
    .db("beauty-saloon")
    .collection("users")
    .updateOne(query, updateQuery);
}
export function deleteToken(token) {
  return client
    .db("beauty-saloon")
    .collection("users")
    .updateOne({ token: token }, { $unset: { token: "" } });
}
export async function verifyEmailToken(data) {
  return client.db("beauty-saloon").collection("users").findOne(data);
}

export function activatateUser(token) {
  return client
    .db("beauty-saloon")
    .collection("users")
    .updateOne({ confirmationToken: token }, { $set: { isActive: true } });
}

export function insertAccountConfirmationCode(data, confirmationToken) {
  return client
    .db("beauty-saloon")
    .collection("users")
    .updateOne(data, {
      $set: { confirmationToken: confirmationToken },
    });
}

export async function isUserActive(data) {
  return client.db("beauty-saloon").collection("users").findOne(data);
}
