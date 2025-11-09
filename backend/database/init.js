const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function initializeDatabase() {
    console.log('🚀 Initializing database...\n');
    
    try {
        // Read and execute schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        
        console.log('📋 Running schema...');
        await pool.query(schema);
        
        console.log('✓ Database schema created successfully!\n');
        console.log('📊 Database tables:');
        console.log('  - users');
        console.log('  - team_members');
        console.log('  - projects');
        console.log('  - sessions');
        
        console.log('\n✓ Default team members created!');
        console.log('\n🔐 Default admin user:');
        console.log('  Email: admin@portfoliohub.com');
        console.log('  Password: Admin@123');
        console.log('  ⚠️  Please change this password after first login!\n');
        
        console.log('✅ Database initialization complete!');
        
    } catch (error) {
        console.error('✗ Error initializing database:', error.message);
        console.error(error.stack);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

// Run initialization
initializeDatabase();

