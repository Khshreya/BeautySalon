import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);

async function createAdminUser() {
  try {
    // Connect to the database
    await client.connect();
    console.log("Connected to database");

    const db = client.db("beauty-saloon");
    const usersCollection = db.collection("users");

    // Admin user details
    const adminUser = {
      username: "admin",
      email: "admin@example.com",
      password: "123456", // original plain-text password
      userType: "admin",
      createdOn: new Date().toISOString(),
    };

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminUser.password, saltRounds);

    // Replace plain password with hashed password
    adminUser.password = hashedPassword;

    // Check if admin user already exists
    const existingUser = await usersCollection.findOne({ email: adminUser.email });
    if (existingUser) {
      console.log("Admin user already exists in the database.");
      return;
    }

    // Insert the admin user into the database
    const result = await usersCollection.insertOne(adminUser);
    console.log("Admin user inserted successfully:", result.insertedId);
  } catch (error) {
    console.error("Error while inserting admin user:", error);
  } finally {
    // Close the database connection
    await client.close();
    console.log("Database connection closed.");
  }
}

// Run the function
createAdminUser();
