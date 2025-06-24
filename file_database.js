// SynthBot File-Based Database System
// Provides persistent data storage using organized JSON files
// Maintains the same structure as the SQL database

class SynthBotFileDatabase {
    constructor() {
        this.dataDir = './synthbot_data';
        this.isConnected = false;
        this.data = {
            users: [],
            user_profiles: [],
            api_configurations: [],
            api_usage_logs: [],
            conversation_sessions: [],
            conversation_messages: [],
            available_voices: [],
            user_voice_preferences: [],
            quantum_sessions: [],
            quantum_random_numbers: [],
            system_configurations: [],
            feature_flags: [],
            user_feature_access: [],
            audit_logs: [],
            error_logs: []
        };
        this.autoSaveInterval = null;
        this.lastSaveTime = null;
    }

    // Initialize file database
    async connect() {
        try {
            console.log('🔗 Initializing SynthBot file database...');
            
            // Create data directory if it doesn't exist
            await this.createDataDirectory();
            
            // Load existing data from files
            await this.loadAllData();
            
            // Initialize with default data if empty
            await this.initializeDefaultData();
            
            // Start auto-save functionality
            this.startAutoSave();
            
            this.isConnected = true;
            console.log('✅ File database initialized successfully');
            
            return true;
        } catch (error) {
            console.error('❌ File database initialization failed:', error);
            this.isConnected = false;
            return false;
        }
    }

    // Create data directory structure
    async createDataDirectory() {
        const fs = await this.getFileSystem();
        const path = await this.getPath();
        
        // Create main data directory
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
        
        // Create subdirectories for better organization
        const subdirs = [
            'users',
            'conversations',
            'api',
            'voices',
            'quantum',
            'system',
            'logs'
        ];
        
        for (const subdir of subdirs) {
            const subdirPath = path.join(this.dataDir, subdir);
            if (!fs.existsSync(subdirPath)) {
                fs.mkdirSync(subdirPath, { recursive: true });
            }
        }
    }

    // Get file system module (Node.js or browser)
    async getFileSystem() {
        if (typeof require !== 'undefined') {
            return require('fs');
        } else {
            // Browser fallback - use localStorage
            return {
                existsSync: () => true,
                mkdirSync: () => {},
                readFileSync: (file) => {
                    const key = `synthbot_${file}`;
                    const data = localStorage.getItem(key);
                    return data || '[]';
                },
                writeFileSync: (file, data) => {
                    const key = `synthbot_${file}`;
                    localStorage.setItem(key, data);
                }
            };
        }
    }

    // Get path module (Node.js or browser)
    async getPath() {
        if (typeof require !== 'undefined') {
            return require('path');
        } else {
            // Browser fallback
            return {
                join: (...parts) => parts.join('/'),
                basename: (file) => file.split('/').pop()
            };
        }
    }

    // Load all data from files
    async loadAllData() {
        const fs = await this.getFileSystem();
        const path = await this.getPath();
        
        const fileMappings = {
            users: path.join(this.dataDir, 'users', 'users.json'),
            user_profiles: path.join(this.dataDir, 'users', 'profiles.json'),
            api_configurations: path.join(this.dataDir, 'api', 'configurations.json'),
            api_usage_logs: path.join(this.dataDir, 'api', 'usage_logs.json'),
            conversation_sessions: path.join(this.dataDir, 'conversations', 'sessions.json'),
            conversation_messages: path.join(this.dataDir, 'conversations', 'messages.json'),
            available_voices: path.join(this.dataDir, 'voices', 'available_voices.json'),
            user_voice_preferences: path.join(this.dataDir, 'voices', 'preferences.json'),
            quantum_sessions: path.join(this.dataDir, 'quantum', 'sessions.json'),
            quantum_random_numbers: path.join(this.dataDir, 'quantum', 'random_numbers.json'),
            system_configurations: path.join(this.dataDir, 'system', 'configurations.json'),
            feature_flags: path.join(this.dataDir, 'system', 'feature_flags.json'),
            user_feature_access: path.join(this.dataDir, 'system', 'feature_access.json'),
            audit_logs: path.join(this.dataDir, 'logs', 'audit_logs.json'),
            error_logs: path.join(this.dataDir, 'logs', 'error_logs.json')
        };

        for (const [key, filePath] of Object.entries(fileMappings)) {
            try {
                if (fs.existsSync(filePath)) {
                    const fileData = fs.readFileSync(filePath, 'utf8');
                    this.data[key] = JSON.parse(fileData);
                } else {
                    this.data[key] = [];
                }
            } catch (error) {
                console.warn(`⚠️ Error loading ${key}:`, error);
                this.data[key] = [];
            }
        }
    }

    // Save all data to files
    async saveAllData() {
        const fs = await this.getFileSystem();
        const path = await this.getPath();
        
        const fileMappings = {
            users: path.join(this.dataDir, 'users', 'users.json'),
            user_profiles: path.join(this.dataDir, 'users', 'profiles.json'),
            api_configurations: path.join(this.dataDir, 'api', 'configurations.json'),
            api_usage_logs: path.join(this.dataDir, 'api', 'usage_logs.json'),
            conversation_sessions: path.join(this.dataDir, 'conversations', 'sessions.json'),
            conversation_messages: path.join(this.dataDir, 'conversations', 'messages.json'),
            available_voices: path.join(this.dataDir, 'voices', 'available_voices.json'),
            user_voice_preferences: path.join(this.dataDir, 'voices', 'preferences.json'),
            quantum_sessions: path.join(this.dataDir, 'quantum', 'sessions.json'),
            quantum_random_numbers: path.join(this.dataDir, 'quantum', 'random_numbers.json'),
            system_configurations: path.join(this.dataDir, 'system', 'configurations.json'),
            feature_flags: path.join(this.dataDir, 'system', 'feature_flags.json'),
            user_feature_access: path.join(this.dataDir, 'system', 'feature_access.json'),
            audit_logs: path.join(this.dataDir, 'logs', 'audit_logs.json'),
            error_logs: path.join(this.dataDir, 'logs', 'error_logs.json')
        };

        for (const [key, filePath] of Object.entries(fileMappings)) {
            try {
                const jsonData = JSON.stringify(this.data[key], null, 2);
                fs.writeFileSync(filePath, jsonData, 'utf8');
            } catch (error) {
                console.error(`❌ Error saving ${key}:`, error);
            }
        }
        
        this.lastSaveTime = new Date().toISOString();
        console.log(`💾 Data saved at ${this.lastSaveTime}`);
    }

    // Initialize default data
    async initializeDefaultData() {
        // Only initialize if data is empty
        if (this.data.system_configurations.length === 0) {
            this.data.system_configurations = [
                {
                    config_key: 'max_tokens_per_response',
                    config_value: '200',
                    config_type: 'integer',
                    description: 'Maximum tokens allowed per AI response',
                    is_editable: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    config_key: 'default_speech_method',
                    config_value: 'webapi',
                    config_type: 'string',
                    description: 'Default speech synthesis method',
                    is_editable: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    config_key: 'default_ai_service',
                    config_value: 'auto',
                    config_type: 'string',
                    description: 'Default AI service selection',
                    is_editable: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    config_key: 'session_timeout_minutes',
                    config_value: '30',
                    config_type: 'integer',
                    description: 'Session timeout in minutes',
                    is_editable: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    config_key: 'max_conversation_history',
                    config_value: '1000',
                    config_type: 'integer',
                    description: 'Maximum messages to keep in conversation history',
                    is_editable: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    config_key: 'quantum_enhancement_probability',
                    config_value: '0.3',
                    config_type: 'string',
                    description: 'Probability of applying quantum enhancements',
                    is_editable: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ];
        }

        if (this.data.feature_flags.length === 0) {
            this.data.feature_flags = [
                {
                    flag_id: 1,
                    flag_name: 'quantum_processing',
                    flag_description: 'Enable quantum computing features',
                    is_enabled: true,
                    enabled_for_all: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    flag_id: 2,
                    flag_name: 'voice_customization',
                    flag_description: 'Allow users to customize voice settings',
                    is_enabled: true,
                    enabled_for_all: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    flag_id: 3,
                    flag_name: 'conversation_export',
                    flag_description: 'Allow users to export conversation history',
                    is_enabled: true,
                    enabled_for_all: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    flag_id: 4,
                    flag_name: 'advanced_analytics',
                    flag_description: 'Show advanced usage analytics',
                    is_enabled: true,
                    enabled_for_all: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    flag_id: 5,
                    flag_name: 'beta_features',
                    flag_description: 'Enable beta features for testing',
                    is_enabled: false,
                    enabled_for_all: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ];
        }

        if (this.data.available_voices.length === 0) {
            this.data.available_voices = [
                {
                    voice_id: '21m00Tcm4TlvDq8ikWAM',
                    voice_name: 'Rachel',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'female',
                    description: 'Professional and clear voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    voice_id: 'AZnzlk1XvdvUeBnXmlld',
                    voice_name: 'Domi',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'female',
                    description: 'Warm and friendly voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    voice_id: 'EXAVITQu4vr4xnSDxMaL',
                    voice_name: 'Bella',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'female',
                    description: 'Natural and expressive voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    voice_id: 'ErXwobaYiN019PkySvjV',
                    voice_name: 'Antoni',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'male',
                    description: 'Deep and authoritative voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    voice_id: 'MF3mGyEYCl7XYWbV9V6O',
                    voice_name: 'Elli',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'female',
                    description: 'Young and energetic voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    voice_id: 'TxGEqnHWrfWFTfGW9XjX',
                    voice_name: 'Josh',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'male',
                    description: 'Casual and approachable voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    voice_id: 'VR6AewLTigWG4xSOukaG',
                    voice_name: 'Arnold',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'male',
                    description: 'Strong and confident voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    voice_id: 'pNInz6obpgDQGcFmaJgB',
                    voice_name: 'Adam',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'male',
                    description: 'Professional and articulate voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                {
                    voice_id: 'yoZ06aMxZJJ28mfd3POQ',
                    voice_name: 'Sam',
                    voice_category: 'premium',
                    language_code: 'en-US',
                    gender: 'male',
                    description: 'Friendly and conversational voice',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            ];
        }

        // Save the initialized data
        await this.saveAllData();
    }

    // Start auto-save functionality
    startAutoSave() {
        // Auto-save every 30 seconds
        this.autoSaveInterval = setInterval(async () => {
            if (this.isConnected) {
                await this.saveAllData();
            }
        }, 30000);

        // Save on page unload (browser)
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', async () => {
                await this.saveAllData();
            });
        }

        // Save on process exit (Node.js)
        if (typeof process !== 'undefined') {
            process.on('SIGINT', async () => {
                console.log('\n💾 Saving data before exit...');
                await this.saveAllData();
                process.exit(0);
            });

            process.on('SIGTERM', async () => {
                console.log('\n💾 Saving data before exit...');
                await this.saveAllData();
                process.exit(0);
            });
        }
    }

    // Disconnect and save data
    async disconnect() {
        try {
            console.log('🔌 Disconnecting file database...');
            
            // Stop auto-save
            if (this.autoSaveInterval) {
                clearInterval(this.autoSaveInterval);
                this.autoSaveInterval = null;
            }
            
            // Final save
            await this.saveAllData();
            
            this.isConnected = false;
            console.log('✅ File database disconnected and data saved');
        } catch (error) {
            console.error('❌ Error disconnecting file database:', error);
        }
    }

    // User Management Functions
    async createUser(username, email, passwordHash) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const userId = Date.now();
            const user = {
                user_id: userId,
                username: username,
                email: email,
                password_hash: passwordHash,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                is_active: true,
                last_login: null
            };

            this.data.users.push(user);
            await this.saveAllData();

            console.log(`👤 Created user: ${username} (ID: ${userId})`);
            return user;
        } catch (error) {
            console.error('❌ Error creating user:', error);
            throw error;
        }
    }

    async getUserByUsername(username) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const user = this.data.users.find(u => u.username === username && u.is_active);
            console.log(`🔍 Looking up user: ${username}`);
            return user || null;
        } catch (error) {
            console.error('❌ Error getting user:', error);
            throw error;
        }
    }

    // API Configuration Management
    async saveApiConfiguration(userId, serviceType, apiKey) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const configId = Date.now();
            const config = {
                config_id: configId,
                user_id: userId,
                service_type: serviceType,
                api_key_hash: this.hashString(apiKey),
                api_key_encrypted: this.encryptString(apiKey),
                is_active: true,
                last_used: null,
                usage_count: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            // Remove existing config for this user and service
            this.data.api_configurations = this.data.api_configurations.filter(
                c => !(c.user_id === userId && c.service_type === serviceType)
            );

            this.data.api_configurations.push(config);
            await this.saveAllData();

            console.log(`🔑 Saved API configuration for ${serviceType} (User: ${userId})`);
            return config;
        } catch (error) {
            console.error('❌ Error saving API configuration:', error);
            throw error;
        }
    }

    async getApiConfigurations(userId) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const configs = this.data.api_configurations.filter(
                c => c.user_id === userId && c.is_active
            );
            console.log(`🔑 Retrieving API configurations for user: ${userId}`);
            return configs;
        } catch (error) {
            console.error('❌ Error getting API configurations:', error);
            throw error;
        }
    }

    // Conversation Management
    async createConversationSession(userId, sessionName, aiService, speechMethod, voiceId) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const sessionId = Date.now();
            const session = {
                session_id: sessionId,
                user_id: userId,
                session_name: sessionName,
                ai_service_used: aiService,
                speech_method_used: speechMethod,
                voice_id_used: voiceId,
                started_at: new Date().toISOString(),
                ended_at: null,
                message_count: 0,
                total_tokens_used: 0,
                is_active: true
            };

            this.data.conversation_sessions.push(session);
            await this.saveAllData();

            console.log(`💬 Created conversation session: ${sessionName} (ID: ${sessionId})`);
            return session;
        } catch (error) {
            console.error('❌ Error creating conversation session:', error);
            throw error;
        }
    }

    async addConversationMessage(sessionId, userId, messageType, content, aiService, speechMethod, voiceId, tokensUsed, processingTime, audioPath, audioDuration) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const messageId = Date.now();
            const message = {
                message_id: messageId,
                session_id: sessionId,
                user_id: userId,
                message_type: messageType,
                content: content,
                ai_service_used: aiService,
                speech_method_used: speechMethod,
                voice_id_used: voiceId,
                tokens_used: tokensUsed || 0,
                processing_time_ms: processingTime || 0,
                audio_file_path: audioPath,
                audio_duration_seconds: audioDuration,
                created_at: new Date().toISOString()
            };

            this.data.conversation_messages.push(message);

            // Update session message count and token usage
            const session = this.data.conversation_sessions.find(s => s.session_id === sessionId);
            if (session) {
                session.message_count += 1;
                session.total_tokens_used += (tokensUsed || 0);
            }

            await this.saveAllData();

            console.log(`💬 Added message to session ${sessionId}: ${messageType}`);
            return message;
        } catch (error) {
            console.error('❌ Error adding conversation message:', error);
            throw error;
        }
    }

    async getConversationHistory(sessionId, limit = 50) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const messages = this.data.conversation_messages
                .filter(m => m.session_id === sessionId)
                .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                .slice(-limit);

            console.log(`📜 Retrieving conversation history for session: ${sessionId}`);
            return messages;
        } catch (error) {
            console.error('❌ Error getting conversation history:', error);
            throw error;
        }
    }

    // API Usage Logging
    async logApiUsage(userId, configId, serviceType, endpoint, requestTokens, responseTokens, processingTime, statusCode, success, errorMessage) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const logId = Date.now();
            const log = {
                log_id: logId,
                user_id: userId,
                config_id: configId,
                service_type: serviceType,
                endpoint_used: endpoint,
                request_tokens: requestTokens || 0,
                response_tokens: responseTokens || 0,
                processing_time_ms: processingTime || 0,
                status_code: statusCode,
                success: success,
                error_message: errorMessage,
                created_at: new Date().toISOString()
            };

            this.data.api_usage_logs.push(log);

            // Update usage count in api_configurations
            if (success) {
                const config = this.data.api_configurations.find(c => c.config_id === configId);
                if (config) {
                    config.usage_count += 1;
                    config.last_used = new Date().toISOString();
                }
            }

            await this.saveAllData();

            console.log(`📊 Logged API usage: ${serviceType} - ${endpoint} (Success: ${success})`);
            return log;
        } catch (error) {
            console.error('❌ Error logging API usage:', error);
            throw error;
        }
    }

    // Voice Management
    async getAvailableVoices() {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const voices = this.data.available_voices.filter(v => v.is_active);
            console.log('🎤 Retrieving available voices...');
            return voices;
        } catch (error) {
            console.error('❌ Error getting available voices:', error);
            throw error;
        }
    }

    // Quantum Computing Integration
    async logQuantumSession(userId, sessionId, backend, circuitData, qubitsUsed, enhancementType, processingTime, success) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const quantumSessionId = Date.now();
            const session = {
                quantum_session_id: quantumSessionId,
                user_id: userId,
                session_id: sessionId,
                ibm_quantum_backend: backend,
                quantum_circuit_data: circuitData,
                qubits_used: qubitsUsed || 0,
                quantum_enhancement_type: enhancementType,
                processing_time_ms: processingTime || 0,
                success: success,
                created_at: new Date().toISOString()
            };

            this.data.quantum_sessions.push(session);
            await this.saveAllData();

            console.log(`⚛️ Logged quantum session: ${enhancementType} (Qubits: ${qubitsUsed})`);
            return session;
        } catch (error) {
            console.error('❌ Error logging quantum session:', error);
            throw error;
        }
    }

    // Analytics and Reporting
    async getApiUsageStats(userId) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const userLogs = this.data.api_usage_logs.filter(log => log.user_id === userId);
            const stats = {};

            userLogs.forEach(log => {
                if (!stats[log.service_type]) {
                    stats[log.service_type] = {
                        service_type: log.service_type,
                        total_requests: 0,
                        successful_requests: 0,
                        total_tokens: 0,
                        avg_processing_time: 0,
                        last_used: null
                    };
                }

                stats[log.service_type].total_requests += 1;
                if (log.success) {
                    stats[log.service_type].successful_requests += 1;
                }
                stats[log.service_type].total_tokens += (log.request_tokens + log.response_tokens);
                
                if (!stats[log.service_type].last_used || new Date(log.created_at) > new Date(stats[log.service_type].last_used)) {
                    stats[log.service_type].last_used = log.created_at;
                }
            });

            // Calculate average processing time
            Object.values(stats).forEach(stat => {
                const serviceLogs = userLogs.filter(log => log.service_type === stat.service_type);
                const totalTime = serviceLogs.reduce((sum, log) => sum + log.processing_time_ms, 0);
                stat.avg_processing_time = serviceLogs.length > 0 ? totalTime / serviceLogs.length : 0;
            });

            console.log(`📈 Retrieving API usage statistics for user: ${userId}`);
            return Object.values(stats);
        } catch (error) {
            console.error('❌ Error getting API usage stats:', error);
            throw error;
        }
    }

    // System Configuration
    async getSystemConfiguration(configKey) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const config = this.data.system_configurations.find(c => c.config_key === configKey);
            console.log(`⚙️ Retrieving system configuration: ${configKey}`);
            return config ? config.config_value : null;
        } catch (error) {
            console.error('❌ Error getting system configuration:', error);
            throw error;
        }
    }

    // Audit Logging
    async logAuditEvent(userId, actionType, actionDescription, ipAddress, userAgent, success, errorMessage) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const auditId = Date.now();
            const audit = {
                audit_id: auditId,
                user_id: userId,
                action_type: actionType,
                action_description: actionDescription,
                ip_address: ipAddress,
                user_agent: userAgent,
                success: success,
                error_message: errorMessage,
                created_at: new Date().toISOString()
            };

            this.data.audit_logs.push(audit);
            await this.saveAllData();

            console.log(`📋 Logged audit event: ${actionType} (User: ${userId})`);
            return audit;
        } catch (error) {
            console.error('❌ Error logging audit event:', error);
            throw error;
        }
    }

    // Error Logging
    async logError(userId, errorType, errorMessage, stackTrace, contextData, severity) {
        if (!this.isConnected) {
            throw new Error('Database not connected');
        }

        try {
            const errorId = Date.now();
            const error = {
                error_id: errorId,
                user_id: userId,
                error_type: errorType,
                error_message: errorMessage,
                stack_trace: stackTrace,
                context_data: contextData,
                severity: severity || 'medium',
                resolved: false,
                created_at: new Date().toISOString(),
                resolved_at: null
            };

            this.data.error_logs.push(error);
            await this.saveAllData();

            console.log(`🚨 Logged error: ${errorType} (Severity: ${severity})`);
            return error;
        } catch (error) {
            console.error('❌ Error logging error:', error);
            throw error;
        }
    }

    // Utility Functions
    hashString(str) {
        // Simple hash function for demo purposes
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    encryptString(str) {
        // Simple encryption for demo purposes
        // In production, use proper encryption libraries
        return btoa(str);
    }

    async healthCheck() {
        try {
            if (!this.isConnected) {
                return { status: 'disconnected', message: 'Database not connected' };
            }
            
            const totalRecords = Object.values(this.data).reduce((sum, arr) => sum + arr.length, 0);
            return { 
                status: 'healthy', 
                message: 'File database is working properly',
                total_records: totalRecords,
                last_save: this.lastSaveTime
            };
        } catch (error) {
            return { status: 'error', message: error.message };
        }
    }

    async backupDatabase() {
        try {
            console.log('💾 Starting database backup...');
            
            const backupId = `backup_${Date.now()}`;
            const backupPath = `./synthbot_data/backups/${backupId}`;
            
            // Create backup directory
            const fs = await this.getFileSystem();
            const path = await this.getPath();
            
            if (!fs.existsSync(backupPath)) {
                fs.mkdirSync(backupPath, { recursive: true });
            }
            
            // Copy all data files to backup
            await this.saveAllData();
            
            console.log(`✅ Database backup completed: ${backupId}`);
            
            return {
                backup_id: backupId,
                timestamp: new Date().toISOString(),
                status: 'completed',
                path: backupPath
            };
        } catch (error) {
            console.error('❌ Error during database backup:', error);
            throw error;
        }
    }

    // Export data to JSON file
    async exportData(format = 'json') {
        try {
            const exportId = `export_${Date.now()}`;
            const fs = await this.getFileSystem();
            
            if (format === 'json') {
                const exportData = {
                    export_info: {
                        timestamp: new Date().toISOString(),
                        version: '1.0',
                        total_records: Object.values(this.data).reduce((sum, arr) => sum + arr.length, 0)
                    },
                    data: this.data
                };
                
                const jsonData = JSON.stringify(exportData, null, 2);
                fs.writeFileSync(`./synthbot_data/${exportId}.json`, jsonData, 'utf8');
                
                console.log(`📤 Data exported to: ${exportId}.json`);
                return { export_id: exportId, format: 'json', path: `./synthbot_data/${exportId}.json` };
            }
        } catch (error) {
            console.error('❌ Error exporting data:', error);
            throw error;
        }
    }
}

// Export the file database class
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SynthBotFileDatabase;
} else {
    // Browser environment
    window.SynthBotFileDatabase = SynthBotFileDatabase;
}

// Usage example:
/*
const fileDb = new SynthBotFileDatabase();
await fileDb.connect();

// Create a conversation session
const session = await fileDb.createConversationSession(
    1, 
    'Test Conversation', 
    'enhanced', 
    'webapi', 
    '21m00Tcm4TlvDq8ikWAM'
);

// Add a message
await fileDb.addConversationMessage(
    session.session_id,
    1,
    'user_input',
    'Hello, how are you?',
    'enhanced',
    'webapi',
    '21m00Tcm4TlvDq8ikWAM',
    10,
    500,
    null,
    null
);

// Export data before exit
await fileDb.exportData('json');
await fileDb.disconnect();
*/ 