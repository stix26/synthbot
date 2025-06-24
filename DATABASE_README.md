# SynthBot Database Documentation

## Overview

The SynthBot database is a comprehensive MySQL database designed to support an AI voice assistant application with quantum computing capabilities. It follows database design best practices including normalization, descriptive naming, consistency, and proper indexing.

## Database Structure

### Key Features

1. **User Management**: Secure user accounts with profile management
2. **API Integration**: Support for OpenAI, Anthropic, ElevenLabs, and IBM Quantum
3. **Conversation Tracking**: Complete conversation history and session management
4. **Voice Customization**: Flexible voice selection and customization options
5. **Quantum Computing**: Integration with IBM Quantum for enhanced responses
6. **Analytics**: Comprehensive usage tracking and performance monitoring
7. **Security**: Audit logging and error tracking for compliance

### Design Principles

- **Normalization**: Tables are normalized to reduce redundancy
- **Descriptive Naming**: All tables, columns, and procedures use clear, descriptive names
- **Consistency**: Consistent naming conventions throughout the schema
- **Performance**: Strategic indexing for common query patterns
- **Scalability**: Designed to handle growth in users and data volume
- **Security**: Proper foreign key constraints and audit trails

## Installation and Setup

### Prerequisites

- MySQL 8.0 or higher
- Node.js (for the JavaScript integration)
- MySQL client or workbench

### Database Setup

1. **Create the database**:
   ```bash
   mysql -u root -p < database_setup.sql
   ```

2. **Create a dedicated user** (recommended):
   ```sql
   CREATE USER 'synthbot_user'@'localhost' IDENTIFIED BY 'your_secure_password';
   GRANT ALL PRIVILEGES ON synthbot_db.* TO 'synthbot_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Update configuration** in `database_connection.js`:
   ```javascript
   this.config = {
       host: 'localhost',
       port: 3306,
       user: 'synthbot_user',
       password: 'your_secure_password',
       database: 'synthbot_db',
       charset: 'utf8mb4',
       timezone: 'UTC'
   };
   ```

## Database Schema

### Core Tables

#### Users and Authentication
- `users` - User account information and authentication
- `user_profiles` - User preferences and profile information

#### API Management
- `api_configurations` - Encrypted API keys and configuration data
- `api_usage_logs` - API usage tracking for monitoring and billing

#### Conversation Management
- `conversation_sessions` - Conversation sessions and metadata
- `conversation_messages` - Individual messages within conversations

#### Voice and Speech
- `available_voices` - Catalog of available ElevenLabs voices
- `user_voice_preferences` - User-specific voice customization

#### Quantum Computing
- `quantum_sessions` - Quantum computing sessions and enhancements
- `quantum_random_numbers` - Quantum-generated random numbers

#### System Management
- `system_configurations` - System-wide configuration settings
- `feature_flags` - Feature flags for enabling/disabling functionality
- `user_feature_access` - User-specific feature access permissions

#### Audit and Logging
- `audit_logs` - Comprehensive audit trail for security and compliance
- `error_logs` - System errors for debugging and monitoring

### Views

The database includes several views for simplified data access:

- `v_active_user_sessions` - Active user sessions with conversation counts
- `v_api_usage_stats` - API usage statistics
- `v_user_preferences` - User preferences summary

### Stored Procedures

Common operations are handled through stored procedures:

- `sp_create_conversation_session()` - Create new conversation sessions
- `sp_add_conversation_message()` - Add messages to conversations
- `sp_log_api_usage()` - Log API usage for monitoring
- `sp_get_user_api_configs()` - Get user's active API configurations

## Usage Examples

### Basic Database Operations

```javascript
const db = new SynthBotDatabase();
await db.connect();

// Create a user
const user = await db.createUser('john_doe', 'john@example.com', 'hashed_password');

// Save API configuration
await db.saveApiConfiguration(user.user_id, 'openai', 'sk-...');

// Create conversation session
const session = await db.createConversationSession(
    user.user_id,
    'My First Chat',
    'enhanced',
    'webapi',
    '21m00Tcm4TlvDq8ikWAM'
);

// Add conversation message
await db.addConversationMessage(
    session.session_id,
    user.user_id,
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

await db.disconnect();
```

### API Usage Logging

```javascript
// Log successful API call
await db.logApiUsage(
    userId,
    configId,
    'openai',
    '/v1/chat/completions',
    50,
    100,
    1200,
    200,
    true,
    null
);

// Log failed API call
await db.logApiUsage(
    userId,
    configId,
    'anthropic',
    '/v1/messages',
    30,
    0,
    500,
    401,
    false,
    'Invalid API key'
);
```

### Analytics and Reporting

```javascript
// Get API usage statistics
const stats = await db.getApiUsageStats(userId);
console.log('API Usage Stats:', stats);

// Get conversation history
const history = await db.getConversationHistory(sessionId, 50);
console.log('Conversation History:', history);

// Get available voices
const voices = await db.getAvailableVoices();
console.log('Available Voices:', voices);
```

## Security Considerations

### API Key Storage

- API keys are encrypted before storage
- Keys are hashed for quick validation
- Access is logged for audit purposes

### User Data Protection

- Passwords are hashed using secure algorithms
- User sessions are tracked and can be invalidated
- Audit logs capture all user actions

### Database Security

- Use dedicated database user with minimal privileges
- Enable SSL connections for production
- Regular security updates and patches
- Backup encryption for sensitive data

## Performance Optimization

### Indexing Strategy

The database includes strategic indexes for common query patterns:

- User lookups by username and email
- Session queries by user and date
- Message queries by session and date
- API usage queries by service and date

### Query Optimization

- Use stored procedures for common operations
- Leverage views for complex queries
- Monitor slow query logs
- Regular index maintenance

## Backup and Recovery

### Automated Backups

```javascript
// Perform database backup
const backup = await db.backupDatabase();
console.log('Backup completed:', backup.backup_id);
```

### Manual Backup Commands

```bash
# Full database backup
mysqldump -u synthbot_user -p synthbot_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Backup specific tables
mysqldump -u synthbot_user -p synthbot_db conversation_messages > messages_backup.sql
```

## Monitoring and Maintenance

### Health Checks

```javascript
// Check database health
const health = await db.healthCheck();
console.log('Database Health:', health);
```

### Regular Maintenance Tasks

1. **Daily**: Monitor error logs and API usage
2. **Weekly**: Review audit logs and performance metrics
3. **Monthly**: Clean up old conversation data and optimize indexes
4. **Quarterly**: Full database backup and security review

## Troubleshooting

### Common Issues

1. **Connection Errors**: Check database credentials and network connectivity
2. **Performance Issues**: Review query execution plans and index usage
3. **Storage Issues**: Monitor database size and implement data retention policies
4. **Security Issues**: Review audit logs and user access patterns

### Error Logging

```javascript
// Log application errors
await db.logError(
    userId,
    'api_timeout',
    'OpenAI API request timed out',
    stackTrace,
    { endpoint: '/v1/chat/completions', timeout: 30000 },
    'medium'
);
```

## Integration with SynthBot

### Frontend Integration

Include the database connection in your HTML:

```html
<script src="database_connection.js"></script>
<script>
    // Initialize database connection
    const db = new SynthBotDatabase();
    
    // Connect on page load
    window.addEventListener('load', async () => {
        await db.connect();
        console.log('Database connected');
    });
</script>
```

### API Integration

The database integrates seamlessly with the existing SynthBot API structure:

- Store conversation history for persistence
- Track API usage for billing and monitoring
- Maintain user preferences across sessions
- Enable advanced analytics and reporting

## Best Practices

1. **Always use stored procedures** for common operations
2. **Utilize views** for simplified data access
3. **Monitor performance** using the provided indexes
4. **Regularly backup** conversation and audit data
5. **Use feature flags** for controlled feature rollouts
6. **Implement proper error handling** and logging
7. **Follow security best practices** for API key management

## Support and Documentation

For additional support:

- Review the database schema documentation in `database_setup.sql`
- Check the JavaScript integration examples in `database_connection.js`
- Monitor database logs for troubleshooting
- Implement proper monitoring and alerting for production use

The SynthBot database provides a robust foundation for building a scalable, secure, and feature-rich AI voice assistant application. 