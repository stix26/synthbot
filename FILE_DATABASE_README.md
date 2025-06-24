# SynthBot File Database

## Overview

SynthBot now includes a **file-based database system** that automatically saves all conversation data, API usage, and user interactions to organized JSON files. When you kill the terminal, all data is automatically exported to the `synthbot_data` directory.

## Features

✅ **Automatic Data Persistence** - All conversations are saved automatically  
✅ **Organized File Structure** - Data is organized into logical directories  
✅ **API Usage Tracking** - Monitor OpenAI, Claude, and ElevenLabs usage  
✅ **Conversation History** - Complete chat history with timestamps  
✅ **Auto-Save** - Data saved every 30 seconds and on exit  
✅ **Export on Exit** - Complete data export when terminal is killed  

## File Structure

When you run SynthBot, it creates this directory structure:

```
synthbot_data/
├── users/
│   └── users.json              # User accounts and profiles
├── conversations/
│   └── conversations.json      # Chat sessions and messages
├── api/
│   └── usage.json              # API usage logs and statistics
├── voices/
│   └── voices.json             # Available voices and preferences
├── quantum/
│   └── sessions.json           # Quantum computing sessions
├── system/
│   └── config.json             # System configurations
├── logs/
│   └── audit.json              # Audit logs and error tracking
└── export_[timestamp].json     # Complete data export
```

## Data Categories

### 1. **Users** (`users/users.json`)
- User accounts and profiles
- Session information
- Preferences and settings

### 2. **Conversations** (`conversations/conversations.json`)
- Complete chat sessions
- Individual messages with timestamps
- AI service used for each response
- Message types (user input, AI response)

### 3. **API Usage** (`api/usage.json`)
- OpenAI API calls and token usage
- Anthropic Claude API calls
- ElevenLabs speech synthesis requests
- Success/failure tracking
- Response times and error logs

### 4. **Voices** (`voices/voices.json`)
- Available ElevenLabs voices
- User voice preferences
- Voice customization settings

### 5. **Quantum Sessions** (`quantum/sessions.json`)
- IBM Quantum computing sessions
- Enhancement types and results
- Processing times and success rates

### 6. **System Config** (`system/config.json`)
- Application settings
- Feature flags
- Default configurations

### 7. **Audit Logs** (`logs/audit.json`)
- User actions and events
- Error tracking
- Security audit trail

## Usage Examples

### Browser Console Commands

```javascript
// Export all data to JSON file
await exportDatabase();

// Get API usage statistics
await getDatabaseStats();

// Get conversation history
await getConversationHistory();

// Check database health
fileDB.healthCheck();
```

### Data Export

When you kill the terminal (Ctrl+C), SynthBot automatically:

1. **Saves all current data** to individual JSON files
2. **Creates a complete export** file with all data
3. **Logs the export** with timestamp and file location

The export file contains:
```json
{
  "export_info": {
    "timestamp": "2024-01-15T10:30:00.000Z",
    "version": "1.0",
    "total_records": 150
  },
  "data": {
    "users": [...],
    "conversations": [...],
    "api_usage": [...],
    "voices": [...],
    "quantum_sessions": [...],
    "system_config": [...],
    "audit_logs": [...]
  }
}
```

## Auto-Save Features

### **Every 30 Seconds**
- All conversation data is automatically saved
- API usage logs are updated
- System state is preserved

### **On Page Unload**
- Complete data save before browser closes
- Export file created with all data
- Database connection properly closed

### **On Terminal Kill (Ctrl+C)**
- Emergency save of all data
- Complete export file created
- Clean shutdown with data preservation

## Data Organization Principles

✅ **Descriptive Naming** - Clear, meaningful file and directory names  
✅ **Consistency** - Uniform structure across all data types  
✅ **Filtering** - Only relevant data is stored and tracked  
✅ **Ordering** - Data sorted by timestamps and logical sequences  
✅ **Comments** - Self-documenting JSON structure  
✅ **Normalization** - Organized to reduce redundancy  
✅ **Views** - Simplified access through logical groupings  

## Benefits

### **Data Persistence**
- Never lose conversations or settings
- Complete history of all interactions
- Backup and restore capabilities

### **Analytics**
- Track API usage and costs
- Monitor conversation patterns
- Analyze user preferences

### **Debugging**
- Complete audit trail
- Error tracking and resolution
- Performance monitoring

### **Development**
- Test data preservation
- Feature development tracking
- User experience analysis

## File Format

All data is stored in **well-formatted JSON** with:

- **Proper indentation** for readability
- **Consistent structure** across all files
- **Timestamp tracking** for all events
- **Error handling** and validation
- **Backward compatibility** for future updates

## Security

- **No sensitive data** stored in plain text
- **API keys** are hashed and encrypted
- **User privacy** maintained through proper data handling
- **Audit trails** for security monitoring

## Integration

The file database integrates seamlessly with SynthBot:

- **Automatic initialization** on app startup
- **Real-time saving** of all interactions
- **API usage tracking** for all services
- **Conversation persistence** across sessions
- **Export capabilities** for data portability

## Next Steps

1. **Run SynthBot** and start chatting
2. **Check the `synthbot_data` directory** for saved files
3. **Use browser console commands** to export data
4. **Kill the terminal** to see automatic export
5. **Review the organized JSON files** for insights

The file database ensures your SynthBot experience is **persistent, organized, and fully trackable**! 🚀 