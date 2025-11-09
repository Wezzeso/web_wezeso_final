const { Pool } = require('pg');
require('dotenv').config();

// Support both DATABASE_URL (production) and individual params (development)
const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false // Required for most cloud database providers
    } : false,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
} : {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'portfolio_hub',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

// PostgreSQL connection pool
const pool = new Pool(poolConfig);

// Test database connection
pool.on('connect', () => {
    console.log('✓ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('✗ Unexpected error on idle client', err);
    process.exit(-1);
});

// Query helper function
const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Query error', error.stack);
        throw error;
    }
};

// Transaction helper
const getClient = async () => {
    const client = await pool.connect();
    const query = client.query.bind(client);
    const release = client.release.bind(client);
    
    // Set a timeout of 5 seconds
    const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!');
    }, 5000);
    
    // Override release to clear timeout
    client.release = () => {
        clearTimeout(timeout);
        client.release = release;
        return release();
    };
    
    return client;
};

module.exports = {
    query,
    getClient,
    pool
};

