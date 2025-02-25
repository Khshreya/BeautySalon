export async function getCustomerByEmail(data) {
  return client.db("beauty-saloon").collection("customer").findOne(data);
}

export async function fetchCustomerList() {
  return client.db("beauty-saloon").collection("customer").find();
}

export function insertCustomer(data) {
  return client.db("beauty-saloon").collection("customer").insertOne(data);
}

export function deleteCustomerByEmail(data) {
  return client.db("beauty-saloon").collection("customer").deleteOne(data);
}
