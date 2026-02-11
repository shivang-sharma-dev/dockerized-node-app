const http = require('http');
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432,
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.error("DB connection error", err));

const server = http.createServer(async (req, res) => {
  await client.query("CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY)");
  await client.query("INSERT INTO visits DEFAULT VALUES");
  const result = await client.query("SELECT COUNT(*) FROM visits");

  res.end(`Total visits: ${result.rows[0].count}`);
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
