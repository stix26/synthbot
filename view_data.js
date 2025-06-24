#!/usr/bin/env node

// SynthBot Data Viewer
// View data in both JSON and SQL formats

const fs = require('fs');
const path = require('path');

class SynthBotDataViewer {
    constructor() {
        this.dataDir = 'synthbot_data';
    }

    // Check if JSON data exists
    checkJsonData() {
        if (!fs.existsSync(this.dataDir)) {
            console.log('📁 No JSON data directory found.');
            console.log('   Use the SynthBot app first to generate data.');
            return false;
        }
        return true;
    }

    // View JSON data files
    viewJsonData() {
        console.log('\n📊 JSON Data Files:');
        console.log('==================');
        
        if (!this.checkJsonData()) {
            return;
        }

        const files = fs.readdirSync(this.dataDir);
        
        if (files.length === 0) {
            console.log('   No data files found.');
            return;
        }

        files.forEach(file => {
            if (file.endsWith('.json')) {
                const filePath = path.join(this.dataDir, file);
                const stats = fs.statSync(filePath);
                const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                
                console.log(`\n📄 ${file} (${stats.size} bytes)`);
                console.log(`   Records: ${Array.isArray(data) ? data.length : 'N/A'}`);
                
                if (Array.isArray(data) && data.length > 0) {
                    console.log(`   Sample: ${JSON.stringify(data[0], null, 2).substring(0, 200)}...`);
                }
            }
        });
    }

    // View specific JSON file
    viewSpecificFile(filename) {
        const filePath = path.join(this.dataDir, filename);
        
        if (!fs.existsSync(filePath)) {
            console.log(`❌ File not found: ${filename}`);
            return;
        }

        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(`\n📄 ${filename}:`);
        console.log('='.repeat(50));
        console.log(JSON.stringify(data, null, 2));
    }

    // Show SQL setup instructions
    showSqlInstructions() {
        console.log('\n🗄️  SQL Database Setup:');
        console.log('=====================');
        console.log('1. Install MySQL:');
        console.log('   - macOS: brew install mysql');
        console.log('   - Ubuntu: sudo apt install mysql-server');
        console.log('');
        console.log('2. Start MySQL service:');
        console.log('   - macOS: brew services start mysql');
        console.log('   - Ubuntu: sudo systemctl start mysql');
        console.log('');
        console.log('3. Create database:');
        console.log('   mysql -u root -p < database_setup.sql');
        console.log('');
        console.log('4. Update database_connection.js with your credentials');
        console.log('');
        console.log('5. Use the database connection in your app');
    }

    // Show help
    showHelp() {
        console.log('\n🔍 SynthBot Data Viewer');
        console.log('=====================');
        console.log('Usage:');
        console.log('  node view_data.js                    - View all JSON data');
        console.log('  node view_data.js <filename.json>    - View specific file');
        console.log('  node view_data.js --sql              - Show SQL setup instructions');
        console.log('  node view_data.js --help             - Show this help');
        console.log('');
        console.log('Examples:');
        console.log('  node view_data.js conversations.json');
        console.log('  node view_data.js api_usage.json');
    }
}

// Main execution
const viewer = new SynthBotDataViewer();
const args = process.argv.slice(2);

if (args.length === 0) {
    viewer.viewJsonData();
} else if (args[0] === '--sql') {
    viewer.showSqlInstructions();
} else if (args[0] === '--help') {
    viewer.showHelp();
} else {
    viewer.viewSpecificFile(args[0]);
} 