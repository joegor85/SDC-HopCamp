const pg = require("pg");
const dotenv = require("dotenv").config;

const { Pool } = pg;

const connectionString = "postgresql://doadmin:AVNS_hmnEkcnO4NfO-4HgqXq@hopcamp-postgresdb-do-user-14172565-0.b.db.ondigitalocean.com:25060/hopcamp?sslmode=require";
const pool = new Pool({ connectionString: connectionString });

const seedRatings = async () => {
  try {
    // Connect to the database
    const client = await pool.connect();
    const { default: ratingCollection } = await import("./ratingDG.js");

    // Insert the faker data into the table
    await Promise.all(
      ratingCollection.map(async (rating) => {
        const query = {
          text: "INSERT INTO rating (username, pic_url, date, recommend, campsite, top_line, narrative) VALUES ($1, $2, $3, $4, $5, $6, $7)",
          values: [
            rating.username,
            rating.pic_url,
            rating.date,
            rating.recommend,
            rating.campsite,
            rating.top_line,
            rating.narrative
          ],
        };
        await client.query(query);
      })
    );

    // Release the database connection
    client.release();

    console.log("Faker data seeded successfully!");
  } catch (error) {
    console.error("Error seeding faker data:", error);
  } finally {
    // Close the database pool
    pool.end();
  }
};

seedRatings();