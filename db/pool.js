const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DATABASE_USER || "neil",
    host: process.env.DATABASE_HOST || "localhost",
    database: process.env.DATABASE_NAME || "sanhanghoa",
    password: process.env.DATABASE_PASSWORD || "neil",
    port: process.env.DATABASE_PORT || 5432,
    max: 5,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000
});

module.exports = { pool };
