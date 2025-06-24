#!/usr/bin/env node

// SynthBot SQL Data Viewer
// View data in MySQL database

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

class SynthBotSQLViewer {
    constructor() {
        this.database = 'synthbot_db';
        this.user = 'root';
    }

    // Execute SQL query
    async executeQuery(query) {
        try {
            const command = `mysql -u ${this.user} -e "USE ${this.database}; ${query}"`;
            const { stdout, stderr } = await execAsync(command);
            
            if (stderr) {
                console.error('Error:', stderr);
                return null;
            }
            
            return stdout;
        } catch (error) {
            console.error('❌ Query failed:', error.message);
            return null;
        }
    }

    // Show all tables
    async showTables() {
        console.log('\n📋 Available Tables:');
        console.log('===================');
        
        const result = await this.executeQuery('SHOW TABLES;');
        if (result) {
            console.log(result);
        }
    }

    // Show table structure
    async describeTable(tableName) {
        console.log(`\n📊 Table Structure: ${tableName}`);
        console.log('='.repeat(50));
        
        const result = await this.executeQuery(`DESCRIBE ${tableName};`);
        if (result) {
            console.log(result);
        }
    }

    // Show table data
    async showTableData(tableName, limit = 10) {
        console.log(`\n📄 Table Data: ${tableName} (limit ${limit})`);
        console.log('='.repeat(50));
        
        const result = await this.executeQuery(`SELECT * FROM ${tableName} LIMIT ${limit};`);
        if (result) {
            console.log(result);
        }
    }

    // Show conversation history
    async showConversations(limit = 5) {
        console.log('\n💬 Recent Conversations:');
        console.log('========================');
        
        const query = `
            SELECT 
                cs.session_id,
                cs.session_name,
                cs.ai_service_used,
                cs.started_at,
                COUNT(cm.message_id) as message_count
            FROM conversation_sessions cs
            LEFT JOIN conversation_messages cm ON cs.session_id = cm.session_id
            GROUP BY cs.session_id
            ORDER BY cs.started_at DESC
            LIMIT ${limit};
        `;
        
        const result = await this.executeQuery(query);
        if (result) {
            console.log(result);
        }
    }

    // Show API usage stats
    async showApiUsage(limit = 10) {
        console.log('\n📊 API Usage Statistics:');
        console.log('========================');
        
        const query = `
            SELECT 
                service_type,
                COUNT(*) as total_calls,
                SUM(CASE WHEN success = 1 THEN 1 ELSE 0 END) as successful_calls,
                AVG(processing_time_ms) as avg_processing_time,
                SUM(request_tokens + response_tokens) as total_tokens
            FROM api_usage_logs
            GROUP BY service_type
            ORDER BY total_calls DESC
            LIMIT ${limit};
        `;
        
        const result = await this.executeQuery(query);
        if (result) {
            console.log(result);
        }
    }

    // Show user statistics
    async showUserStats() {
        console.log('\n👥 User Statistics:');
        console.log('==================');
        
        const query = `
            SELECT 
                COUNT(*) as total_users,
                SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as active_users,
                COUNT(DISTINCT user_id) as users_with_conversations
            FROM users u
            LEFT JOIN conversation_sessions cs ON u.user_id = cs.user_id;
        `;
        
        const result = await this.executeQuery(query);
        if (result) {
            console.log(result);
        }
    }

    // Show help
    showHelp() {
        console.log('\n🔍 SynthBot SQL Data Viewer');
        console.log('===========================');
        console.log('Usage:');
        console.log('  node view_sql_data.js tables                    - Show all tables');
        console.log('  node view_sql_data.js describe <table>          - Show table structure');
        console.log('  node view_sql_data.js data <table> [limit]      - Show table data');
        console.log('  node view_sql_data.js conversations [limit]     - Show conversation history');
        console.log('  node view_sql_data.js api-usage [limit]         - Show API usage stats');
        console.log('  node view_sql_data.js user-stats                - Show user statistics');
        console.log('  node view_sql_data.js --help                    - Show this help');
        console.log('');
        console.log('Examples:');
        console.log('  node view_sql_data.js describe users');
        console.log('  node view_sql_data.js data conversation_messages 5');
        console.log('  node view_sql_data.js conversations 10');
    }
}

// Main execution
const viewer = new SynthBotSQLViewer();
const args = process.argv.slice(2);

if (args.length === 0) {
    viewer.showHelp();
} else if (args[0] === '--help') {
    viewer.showHelp();
} else if (args[0] === 'tables') {
    viewer.showTables();
} else if (args[0] === 'describe' && args[1]) {
    viewer.describeTable(args[1]);
} else if (args[0] === 'data' && args[1]) {
    const limit = args[2] || 10;
    viewer.showTableData(args[1], limit);
} else if (args[0] === 'conversations') {
    const limit = args[1] || 5;
    viewer.showConversations(limit);
} else if (args[0] === 'api-usage') {
    const limit = args[1] || 10;
    viewer.showApiUsage(limit);
} else if (args[0] === 'user-stats') {
    viewer.showUserStats();
} else {
    console.log('❌ Invalid command. Use --help for usage information.');
} 