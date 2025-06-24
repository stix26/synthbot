-- SynthBot Database Schema
-- Created for AI Voice Assistant with Quantum Processing Capabilities
-- Follows normalization principles and best practices for data integrity

-- =====================================================
-- DATABASE CREATION
-- =====================================================

CREATE DATABASE IF NOT EXISTS synthbot_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE synthbot_db;

-- =====================================================
-- USERS AND AUTHENTICATION
-- =====================================================

-- Users table for managing user accounts and preferences
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_active_users (is_active)
) COMMENT 'Stores user account information and authentication data';

-- User profiles for additional user information
CREATE TABLE user_profiles (
    profile_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    preferred_voice_id VARCHAR(50),
    preferred_speech_method ENUM('elevenlabs', 'webapi') DEFAULT 'webapi',
    preferred_ai_service ENUM('auto', 'openai', 'claude', 'enhanced', 'elevenlabs-only', 'ibm-only') DEFAULT 'auto',
    timezone VARCHAR(50) DEFAULT 'UTC',
    language_preference VARCHAR(10) DEFAULT 'en-US',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_profile (user_id),
    INDEX idx_preferred_voice (preferred_voice_id)
) COMMENT 'Stores user preferences and profile information';

-- =====================================================
-- API CONFIGURATIONS
-- =====================================================

-- API keys and configurations for external services
CREATE TABLE api_configurations (
    config_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    service_type ENUM('openai', 'anthropic', 'elevenlabs', 'ibm_quantum') NOT NULL,
    api_key_hash VARCHAR(255) NOT NULL,
    api_key_encrypted TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    last_used TIMESTAMP NULL,
    usage_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_service (user_id, service_type),
    INDEX idx_service_type (service_type),
    INDEX idx_active_configs (is_active)
) COMMENT 'Stores encrypted API keys and configuration data for external services';

-- API usage tracking for monitoring and billing
CREATE TABLE api_usage_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    config_id INT NOT NULL,
    service_type ENUM('openai', 'anthropic', 'elevenlabs', 'ibm_quantum') NOT NULL,
    endpoint_used VARCHAR(100) NOT NULL,
    request_tokens INT DEFAULT 0,
    response_tokens INT DEFAULT 0,
    processing_time_ms INT,
    status_code INT,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (config_id) REFERENCES api_configurations(config_id) ON DELETE CASCADE,
    INDEX idx_user_usage (user_id),
    INDEX idx_service_usage (service_type),
    INDEX idx_usage_date (created_at),
    INDEX idx_success_status (success)
) COMMENT 'Tracks API usage for monitoring, billing, and performance analysis';

-- =====================================================
-- CONVERSATION MANAGEMENT
-- =====================================================

-- Conversation sessions for organizing chat history
CREATE TABLE conversation_sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_name VARCHAR(100) DEFAULT 'New Conversation',
    ai_service_used ENUM('openai', 'anthropic', 'enhanced', 'quantum_enhanced') NOT NULL,
    speech_method_used ENUM('elevenlabs', 'webapi') NOT NULL,
    voice_id_used VARCHAR(50),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP NULL,
    message_count INT DEFAULT 0,
    total_tokens_used INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_sessions (user_id),
    INDEX idx_active_sessions (is_active),
    INDEX idx_session_date (started_at)
) COMMENT 'Manages conversation sessions and metadata';

-- Individual messages within conversations
CREATE TABLE conversation_messages (
    message_id INT PRIMARY KEY AUTO_INCREMENT,
    session_id INT NOT NULL,
    user_id INT NOT NULL,
    message_type ENUM('user_input', 'ai_response', 'system_message') NOT NULL,
    content TEXT NOT NULL,
    ai_service_used ENUM('openai', 'anthropic', 'enhanced', 'quantum_enhanced') NULL,
    speech_method_used ENUM('elevenlabs', 'webapi') NULL,
    voice_id_used VARCHAR(50) NULL,
    tokens_used INT DEFAULT 0,
    processing_time_ms INT,
    audio_file_path VARCHAR(255) NULL,
    audio_duration_seconds DECIMAL(5,2) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (session_id) REFERENCES conversation_sessions(session_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_session_messages (session_id),
    INDEX idx_user_messages (user_id),
    INDEX idx_message_type (message_type),
    INDEX idx_message_date (created_at)
) COMMENT 'Stores individual messages and their metadata';

-- =====================================================
-- VOICE AND SPEECH CONFIGURATIONS
-- =====================================================

-- Available voices from ElevenLabs
CREATE TABLE available_voices (
    voice_id VARCHAR(50) PRIMARY KEY,
    voice_name VARCHAR(100) NOT NULL,
    voice_category ENUM('premium', 'standard', 'custom') DEFAULT 'standard',
    language_code VARCHAR(10) DEFAULT 'en-US',
    gender ENUM('male', 'female', 'neutral') NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_voice_category (voice_category),
    INDEX idx_language_code (language_code),
    INDEX idx_active_voices (is_active)
) COMMENT 'Catalog of available ElevenLabs voices';

-- User voice preferences and customizations
CREATE TABLE user_voice_preferences (
    preference_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    voice_id VARCHAR(50) NOT NULL,
    stability_setting DECIMAL(3,2) DEFAULT 0.50,
    similarity_boost DECIMAL(3,2) DEFAULT 0.50,
    speed_setting DECIMAL(3,2) DEFAULT 1.00,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (voice_id) REFERENCES available_voices(voice_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_voice (user_id, voice_id),
    INDEX idx_user_preferences (user_id),
    INDEX idx_default_voices (is_default)
) COMMENT 'Stores user-specific voice customization preferences';

-- =====================================================
-- QUANTUM COMPUTING FEATURES
-- =====================================================

-- Quantum processing sessions
CREATE TABLE quantum_sessions (
    quantum_session_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_id INT NOT NULL,
    ibm_quantum_backend VARCHAR(100),
    quantum_circuit_data JSON,
    qubits_used INT DEFAULT 0,
    quantum_enhancement_type ENUM('random_number', 'optimization', 'simulation') NOT NULL,
    processing_time_ms INT,
    success BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (session_id) REFERENCES conversation_sessions(session_id) ON DELETE CASCADE,
    INDEX idx_user_quantum (user_id),
    INDEX idx_quantum_type (quantum_enhancement_type),
    INDEX idx_quantum_date (created_at)
) COMMENT 'Tracks quantum computing sessions and enhancements';

-- Quantum random numbers generated
CREATE TABLE quantum_random_numbers (
    random_id INT PRIMARY KEY AUTO_INCREMENT,
    quantum_session_id INT NOT NULL,
    random_value VARCHAR(50) NOT NULL,
    generation_method VARCHAR(100),
    entropy_source VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (quantum_session_id) REFERENCES quantum_sessions(quantum_session_id) ON DELETE CASCADE,
    INDEX idx_quantum_session (quantum_session_id),
    INDEX idx_random_date (created_at)
) COMMENT 'Stores quantum-generated random numbers for response enhancement';

-- =====================================================
-- SYSTEM CONFIGURATIONS AND SETTINGS
-- =====================================================

-- System-wide configurations
CREATE TABLE system_configurations (
    config_key VARCHAR(100) PRIMARY KEY,
    config_value TEXT NOT NULL,
    config_type ENUM('string', 'integer', 'boolean', 'json') DEFAULT 'string',
    description TEXT,
    is_editable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_config_type (config_type),
    INDEX idx_editable_configs (is_editable)
) COMMENT 'Stores system-wide configuration settings';

-- Feature flags for enabling/disabling functionality
CREATE TABLE feature_flags (
    flag_id INT PRIMARY KEY AUTO_INCREMENT,
    flag_name VARCHAR(100) UNIQUE NOT NULL,
    flag_description TEXT,
    is_enabled BOOLEAN DEFAULT TRUE,
    enabled_for_all BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_flag_status (is_enabled),
    INDEX idx_global_flags (enabled_for_all)
) COMMENT 'Manages feature flags for enabling/disabling functionality';

-- User-specific feature access
CREATE TABLE user_feature_access (
    access_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    flag_id INT NOT NULL,
    is_enabled BOOLEAN DEFAULT TRUE,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    granted_by INT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (flag_id) REFERENCES feature_flags(flag_id) ON DELETE CASCADE,
    FOREIGN KEY (granted_by) REFERENCES users(user_id) ON DELETE SET NULL,
    UNIQUE KEY unique_user_flag (user_id, flag_id),
    INDEX idx_user_access (user_id),
    INDEX idx_flag_access (flag_id)
) COMMENT 'Controls user-specific feature access permissions';

-- =====================================================
-- AUDIT AND LOGGING
-- =====================================================

-- System audit logs for security and compliance
CREATE TABLE audit_logs (
    audit_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    action_type VARCHAR(100) NOT NULL,
    action_description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    success BOOLEAN DEFAULT TRUE,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_action (action_type),
    INDEX idx_audit_date (created_at),
    INDEX idx_audit_success (success)
) COMMENT 'Comprehensive audit trail for security and compliance';

-- Error logs for debugging and monitoring
CREATE TABLE error_logs (
    error_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    error_type VARCHAR(100) NOT NULL,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    context_data JSON,
    severity ENUM('low', 'medium', 'high', 'critical') DEFAULT 'medium',
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_error_user (user_id),
    INDEX idx_error_type (error_type),
    INDEX idx_error_severity (severity),
    INDEX idx_error_date (created_at),
    INDEX idx_unresolved_errors (resolved)
) COMMENT 'Tracks system errors for debugging and monitoring';

-- =====================================================
-- VIEWS FOR SIMPLIFIED DATA ACCESS
-- =====================================================

-- View for active user sessions with conversation counts
CREATE VIEW v_active_user_sessions AS
SELECT 
    u.user_id,
    u.username,
    cs.session_id,
    cs.session_name,
    cs.ai_service_used,
    cs.speech_method_used,
    cs.message_count,
    cs.started_at,
    cs.total_tokens_used
FROM users u
JOIN conversation_sessions cs ON u.user_id = cs.user_id
WHERE cs.is_active = TRUE
ORDER BY cs.started_at DESC;

-- View for API usage statistics
CREATE VIEW v_api_usage_stats AS
SELECT 
    u.username,
    aul.service_type,
    COUNT(*) as total_requests,
    SUM(CASE WHEN aul.success = TRUE THEN 1 ELSE 0 END) as successful_requests,
    SUM(aul.request_tokens + aul.response_tokens) as total_tokens,
    AVG(aul.processing_time_ms) as avg_processing_time,
    MAX(aul.created_at) as last_used
FROM api_usage_logs aul
JOIN users u ON aul.user_id = u.user_id
GROUP BY u.user_id, u.username, aul.service_type
ORDER BY total_requests DESC;

-- View for user preferences summary
CREATE VIEW v_user_preferences AS
SELECT 
    u.user_id,
    u.username,
    up.preferred_voice_id,
    up.preferred_speech_method,
    up.preferred_ai_service,
    av.voice_name,
    COUNT(ac.config_id) as active_api_configs
FROM users u
LEFT JOIN user_profiles up ON u.user_id = up.user_id
LEFT JOIN available_voices av ON up.preferred_voice_id = av.voice_id
LEFT JOIN api_configurations ac ON u.user_id = ac.user_id AND ac.is_active = TRUE
GROUP BY u.user_id, u.username, up.preferred_voice_id, up.preferred_speech_method, up.preferred_ai_service, av.voice_name;

-- =====================================================
-- STORED PROCEDURES FOR COMMON OPERATIONS
-- =====================================================

DELIMITER //

-- Procedure to create a new conversation session
CREATE PROCEDURE sp_create_conversation_session(
    IN p_user_id INT,
    IN p_session_name VARCHAR(100),
    IN p_ai_service ENUM('openai', 'anthropic', 'enhanced', 'quantum_enhanced'),
    IN p_speech_method ENUM('elevenlabs', 'webapi'),
    IN p_voice_id VARCHAR(50)
)
BEGIN
    INSERT INTO conversation_sessions (
        user_id, 
        session_name, 
        ai_service_used, 
        speech_method_used, 
        voice_id_used
    ) VALUES (
        p_user_id, 
        p_session_name, 
        p_ai_service, 
        p_speech_method, 
        p_voice_id
    );
    
    SELECT LAST_INSERT_ID() as session_id;
END //

-- Procedure to add a message to a conversation
CREATE PROCEDURE sp_add_conversation_message(
    IN p_session_id INT,
    IN p_user_id INT,
    IN p_message_type ENUM('user_input', 'ai_response', 'system_message'),
    IN p_content TEXT,
    IN p_ai_service ENUM('openai', 'anthropic', 'enhanced', 'quantum_enhanced'),
    IN p_speech_method ENUM('elevenlabs', 'webapi'),
    IN p_voice_id VARCHAR(50),
    IN p_tokens_used INT,
    IN p_processing_time_ms INT,
    IN p_audio_file_path VARCHAR(255),
    IN p_audio_duration_seconds DECIMAL(5,2)
)
BEGIN
    INSERT INTO conversation_messages (
        session_id,
        user_id,
        message_type,
        content,
        ai_service_used,
        speech_method_used,
        voice_id_used,
        tokens_used,
        processing_time_ms,
        audio_file_path,
        audio_duration_seconds
    ) VALUES (
        p_session_id,
        p_user_id,
        p_message_type,
        p_content,
        p_ai_service,
        p_speech_method,
        p_voice_id,
        p_tokens_used,
        p_processing_time_ms,
        p_audio_file_path,
        p_audio_duration_seconds
    );
    
    -- Update session message count and token usage
    UPDATE conversation_sessions 
    SET message_count = message_count + 1,
        total_tokens_used = total_tokens_used + p_tokens_used
    WHERE session_id = p_session_id;
    
    SELECT LAST_INSERT_ID() as message_id;
END //

-- Procedure to log API usage
CREATE PROCEDURE sp_log_api_usage(
    IN p_user_id INT,
    IN p_config_id INT,
    IN p_service_type ENUM('openai', 'anthropic', 'elevenlabs', 'ibm_quantum'),
    IN p_endpoint_used VARCHAR(100),
    IN p_request_tokens INT,
    IN p_response_tokens INT,
    IN p_processing_time_ms INT,
    IN p_status_code INT,
    IN p_success BOOLEAN,
    IN p_error_message TEXT
)
BEGIN
    INSERT INTO api_usage_logs (
        user_id,
        config_id,
        service_type,
        endpoint_used,
        request_tokens,
        response_tokens,
        processing_time_ms,
        status_code,
        success,
        error_message
    ) VALUES (
        p_user_id,
        p_config_id,
        p_service_type,
        p_endpoint_used,
        p_request_tokens,
        p_response_tokens,
        p_processing_time_ms,
        p_status_code,
        p_success,
        p_error_message
    );
    
    -- Update usage count in api_configurations
    IF p_success = TRUE THEN
        UPDATE api_configurations 
        SET usage_count = usage_count + 1,
            last_used = CURRENT_TIMESTAMP
        WHERE config_id = p_config_id;
    END IF;
END //

-- Procedure to get user's active API configurations
CREATE PROCEDURE sp_get_user_api_configs(IN p_user_id INT)
BEGIN
    SELECT 
        config_id,
        service_type,
        is_active,
        last_used,
        usage_count
    FROM api_configurations 
    WHERE user_id = p_user_id AND is_active = TRUE
    ORDER BY service_type;
END //

DELIMITER ;

-- =====================================================
-- INITIAL DATA INSERTION
-- =====================================================

-- Insert default system configurations
INSERT INTO system_configurations (config_key, config_value, config_type, description) VALUES
('max_tokens_per_response', '200', 'integer', 'Maximum tokens allowed per AI response'),
('default_speech_method', 'webapi', 'string', 'Default speech synthesis method'),
('default_ai_service', 'auto', 'string', 'Default AI service selection'),
('session_timeout_minutes', '30', 'integer', 'Session timeout in minutes'),
('max_conversation_history', '1000', 'integer', 'Maximum messages to keep in conversation history'),
('quantum_enhancement_probability', '0.3', 'string', 'Probability of applying quantum enhancements');

-- Insert default feature flags
INSERT INTO feature_flags (flag_name, flag_description, is_enabled) VALUES
('quantum_processing', 'Enable quantum computing features', TRUE),
('voice_customization', 'Allow users to customize voice settings', TRUE),
('conversation_export', 'Allow users to export conversation history', TRUE),
('advanced_analytics', 'Show advanced usage analytics', TRUE),
('beta_features', 'Enable beta features for testing', FALSE);

-- Insert default ElevenLabs voices
INSERT INTO available_voices (voice_id, voice_name, voice_category, language_code, gender, description) VALUES
('21m00Tcm4TlvDq8ikWAM', 'Rachel', 'premium', 'en-US', 'female', 'Professional and clear voice'),
('AZnzlk1XvdvUeBnXmlld', 'Domi', 'premium', 'en-US', 'female', 'Warm and friendly voice'),
('EXAVITQu4vr4xnSDxMaL', 'Bella', 'premium', 'en-US', 'female', 'Natural and expressive voice'),
('ErXwobaYiN019PkySvjV', 'Antoni', 'premium', 'en-US', 'male', 'Deep and authoritative voice'),
('MF3mGyEYCl7XYWbV9V6O', 'Elli', 'premium', 'en-US', 'female', 'Young and energetic voice'),
('TxGEqnHWrfWFTfGW9XjX', 'Josh', 'premium', 'en-US', 'male', 'Casual and approachable voice'),
('VR6AewLTigWG4xSOukaG', 'Arnold', 'premium', 'en-US', 'male', 'Strong and confident voice'),
('pNInz6obpgDQGcFmaJgB', 'Adam', 'premium', 'en-US', 'male', 'Professional and articulate voice'),
('yoZ06aMxZJJ28mfd3POQ', 'Sam', 'premium', 'en-US', 'male', 'Friendly and conversational voice');

-- =====================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- =====================================================

-- Additional indexes for better query performance
CREATE INDEX idx_conversation_messages_session_date ON conversation_messages(session_id, created_at);
CREATE INDEX idx_api_usage_user_date ON api_usage_logs(user_id, created_at);
CREATE INDEX idx_quantum_sessions_user_date ON quantum_sessions(user_id, created_at);
CREATE INDEX idx_audit_logs_user_date ON audit_logs(user_id, created_at);
CREATE INDEX idx_error_logs_user_date ON error_logs(user_id, created_at);

-- Composite indexes for common query patterns
CREATE INDEX idx_messages_ai_service ON conversation_messages(ai_service_used, created_at);
CREATE INDEX idx_usage_service_date ON api_usage_logs(service_type, created_at);
CREATE INDEX idx_sessions_ai_service ON conversation_sessions(ai_service_used, started_at);

-- =====================================================
-- COMMENTS AND DOCUMENTATION
-- =====================================================

/*
SynthBot Database Schema Documentation

This database schema is designed to support a comprehensive AI voice assistant application
with the following key features:

1. User Management: Secure user accounts with profile management
2. API Integration: Support for OpenAI, Anthropic, ElevenLabs, and IBM Quantum
3. Conversation Tracking: Complete conversation history and session management
4. Voice Customization: Flexible voice selection and customization options
5. Quantum Computing: Integration with IBM Quantum for enhanced responses
6. Analytics: Comprehensive usage tracking and performance monitoring
7. Security: Audit logging and error tracking for compliance

Key Design Principles:
- Normalization: Tables are normalized to reduce redundancy
- Descriptive Naming: All tables, columns, and procedures use clear, descriptive names
- Consistency: Consistent naming conventions throughout the schema
- Performance: Strategic indexing for common query patterns
- Scalability: Designed to handle growth in users and data volume
- Security: Proper foreign key constraints and audit trails

Usage Guidelines:
- Always use stored procedures for common operations
- Utilize views for simplified data access
- Monitor performance using the provided indexes
- Regularly backup conversation and audit data
- Use feature flags for controlled feature rollouts
*/ 