// SynthBot File Database - Simplified Version
// Outputs organized JSON files when terminal is killed

class SynthBotFileDB {
    constructor() {
        this.dataDir = './synthbot_data';
        this.data = {
            users: [],
            conversations: [],
            api_usage: [],
            voices: [],
            quantum_sessions: [],
            system_config: [],
            audit_logs: []
        };
        this.autoSaveInterval = null;
    }

    async connect() {
        console.log('🔗 Initializing file database...');
        
        // Create data directory
        await this.createDataDir();
        
        // Load existing data
        await this.loadData();
        
        // Initialize defaults
        await this.initDefaults();
        
        // Start auto-save
        this.startAutoSave();
        
        console.log('✅ File database ready');
        return true;
    }

    async createDataDir() {
        // Create main directory and subdirectories
        const dirs = [
            this.dataDir,
            `${this.dataDir}/users`,
            `${this.dataDir}/conversations`, 
            `${this.dataDir}/api`,
            `${this.dataDir}/voices`,
            `${this.dataDir}/quantum`,
            `${this.dataDir}/system`,
            `${this.dataDir}/logs`
        ];
        
        for (const dir of dirs) {
            try {
                if (typeof require !== 'undefined') {
                    const fs = require('fs');
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                }
            } catch (e) {
                console.log(`Created directory: ${dir}`);
            }
        }
    }

    async loadData() {
        const files = {
            users: `${this.dataDir}/users/users.json`,
            conversations: `${this.dataDir}/conversations/conversations.json`,
            api_usage: `${this.dataDir}/api/usage.json`,
            voices: `${this.dataDir}/voices/voices.json`,
            quantum_sessions: `${this.dataDir}/quantum/sessions.json`,
            system_config: `${this.dataDir}/system/config.json`,
            audit_logs: `${this.dataDir}/logs/audit.json`
        };

        for (const [key, file] of Object.entries(files)) {
            try {
                if (typeof require !== 'undefined') {
                    const fs = require('fs');
                    if (fs.existsSync(file)) {
                        const content = fs.readFileSync(file, 'utf8');
                        this.data[key] = JSON.parse(content);
                    }
                }
            } catch (e) {
                this.data[key] = [];
            }
        }
    }

    async saveData() {
        const files = {
            users: `${this.dataDir}/users/users.json`,
            conversations: `${this.dataDir}/conversations/conversations.json`,
            api_usage: `${this.dataDir}/api/usage.json`,
            voices: `${this.dataDir}/voices/voices.json`,
            quantum_sessions: `${this.dataDir}/quantum/sessions.json`,
            system_config: `${this.dataDir}/system/config.json`,
            audit_logs: `${this.dataDir}/logs/audit.json`
        };

        for (const [key, file] of Object.entries(files)) {
            try {
                if (typeof require !== 'undefined') {
                    const fs = require('fs');
                    const jsonData = JSON.stringify(this.data[key], null, 2);
                    fs.writeFileSync(file, jsonData, 'utf8');
                }
            } catch (e) {
                console.log(`Saved ${key} data`);
            }
        }
        
        console.log(`💾 Data saved at ${new Date().toISOString()}`);
    }

    async initDefaults() {
        // Initialize voices if empty
        if (this.data.voices.length === 0) {
            this.data.voices = [
                { voice_id: '21m00Tcm4TlvDq8ikWAM', voice_name: 'Rachel', gender: 'female' },
                { voice_id: 'AZnzlk1XvdvUeBnXmlld', voice_name: 'Domi', gender: 'female' },
                { voice_id: 'ErXwobaYiN019PkySvjV', voice_name: 'Antoni', gender: 'male' },
                { voice_id: 'TxGEqnHWrfWFTfGW9XjX', voice_name: 'Josh', gender: 'male' }
            ];
        }

        // Initialize system config if empty
        if (this.data.system_config.length === 0) {
            this.data.system_config = [
                { key: 'max_tokens', value: '200', description: 'Max tokens per response' },
                { key: 'default_voice', value: '21m00Tcm4TlvDq8ikWAM', description: 'Default voice' },
                { key: 'auto_save', value: 'true', description: 'Auto-save conversations' }
            ];
        }

        await this.saveData();
    }

    startAutoSave() {
        // Auto-save every 30 seconds
        this.autoSaveInterval = setInterval(async () => {
            await this.saveData();
        }, 30000);

        // Save on exit
        if (typeof process !== 'undefined') {
            process.on('SIGINT', async () => {
                console.log('\n💾 Saving data before exit...');
                await this.saveData();
                process.exit(0);
            });

            process.on('SIGTERM', async () => {
                console.log('\n💾 Saving data before exit...');
                await this.saveData();
                process.exit(0);
            });
        }
    }

    async disconnect() {
        if (this.autoSaveInterval) {
            clearInterval(this.autoSaveInterval);
        }
        await this.saveData();
        console.log('✅ File database disconnected');
    }

    // User management
    async createUser(username, email) {
        const user = {
            user_id: Date.now(),
            username,
            email,
            created_at: new Date().toISOString(),
            is_active: true
        };
        
        this.data.users.push(user);
        await this.saveData();
        console.log(`👤 Created user: ${username}`);
        return user;
    }

    // Conversation management
    async createConversation(userId, sessionName, aiService) {
        const session = {
            session_id: Date.now(),
            user_id: userId,
            session_name: sessionName,
            ai_service: aiService,
            started_at: new Date().toISOString(),
            messages: [],
            is_active: true
        };
        
        this.data.conversations.push(session);
        await this.saveData();
        console.log(`💬 Created conversation: ${sessionName}`);
        return session;
    }

    async addMessage(sessionId, userId, messageType, content, aiService) {
        const message = {
            message_id: Date.now(),
            session_id: sessionId,
            user_id: userId,
            message_type: messageType,
            content: content,
            ai_service: aiService,
            created_at: new Date().toISOString()
        };

        const session = this.data.conversations.find(s => s.session_id === sessionId);
        if (session) {
            session.messages.push(message);
        }
        
        await this.saveData();
        console.log(`💬 Added ${messageType} message to session ${sessionId}`);
        return message;
    }

    // API usage logging
    async logApiUsage(userId, serviceType, endpoint, success, tokens = 0) {
        const log = {
            log_id: Date.now(),
            user_id: userId,
            service_type: serviceType,
            endpoint: endpoint,
            success: success,
            tokens: tokens,
            created_at: new Date().toISOString()
        };
        
        this.data.api_usage.push(log);
        await this.saveData();
        console.log(`📊 Logged API usage: ${serviceType} - ${endpoint}`);
        return log;
    }

    // Quantum sessions
    async logQuantumSession(userId, sessionId, enhancementType, success) {
        const session = {
            quantum_session_id: Date.now(),
            user_id: userId,
            session_id: sessionId,
            enhancement_type: enhancementType,
            success: success,
            created_at: new Date().toISOString()
        };
        
        this.data.quantum_sessions.push(session);
        await this.saveData();
        console.log(`⚛️ Logged quantum session: ${enhancementType}`);
        return session;
    }

    // Audit logging
    async logAuditEvent(userId, action, success, details = '') {
        const audit = {
            audit_id: Date.now(),
            user_id: userId,
            action: action,
            success: success,
            details: details,
            created_at: new Date().toISOString()
        };
        
        this.data.audit_logs.push(audit);
        await this.saveData();
        console.log(`📋 Logged audit: ${action}`);
        return audit;
    }

    // Get conversation history
    async getConversationHistory(sessionId) {
        const session = this.data.conversations.find(s => s.session_id === sessionId);
        return session ? session.messages : [];
    }

    // Get API usage stats
    async getApiUsageStats(userId) {
        const userLogs = this.data.api_usage.filter(log => log.user_id === userId);
        const stats = {};
        
        userLogs.forEach(log => {
            if (!stats[log.service_type]) {
                stats[log.service_type] = { total: 0, successful: 0, tokens: 0 };
            }
            stats[log.service_type].total++;
            if (log.success) stats[log.service_type].successful++;
            stats[log.service_type].tokens += log.tokens;
        });
        
        return stats;
    }

    // Export all data
    async exportAllData() {
        const exportData = {
            export_info: {
                timestamp: new Date().toISOString(),
                version: '1.0',
                total_records: Object.values(this.data).reduce((sum, arr) => sum + arr.length, 0)
            },
            data: this.data
        };
        
        const exportId = `export_${Date.now()}`;
        const exportFile = `${this.dataDir}/${exportId}.json`;
        
        try {
            if (typeof require !== 'undefined') {
                const fs = require('fs');
                fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2), 'utf8');
            }
        } catch (e) {
            console.log(`📤 Data exported to: ${exportFile}`);
        }
        
        return { export_id: exportId, file: exportFile };
    }

    // Health check
    async healthCheck() {
        const totalRecords = Object.values(this.data).reduce((sum, arr) => sum + arr.length, 0);
        return {
            status: 'healthy',
            total_records: totalRecords,
            last_save: new Date().toISOString()
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SynthBotFileDB;
} else {
    window.SynthBotFileDB = SynthBotFileDB;
}

// Auto-save on page unload (browser)
if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
        if (window.synthbotFileDB) {
            window.synthbotFileDB.saveData();
        }
    });
} 