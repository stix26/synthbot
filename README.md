# SynthBot 🤖

**An Advanced AI Voice Assistant with Cyberpunk UI, Multi-Platform AI Integration, and Quantum Computing Enhancements**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![AI Services](https://img.shields.io/badge/AI-OpenAI%20%7C%20Anthropic%20%7C%20IBM%20Quantum-green.svg)](https://github.com/stix26/synthbot)

## 🎥 Video Tutorial

**Watch SynthBot in Action!**

<!-- Option 1: YouTube Embed -->
[![SynthBot Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)

<!-- Option 2: Direct Video File (if hosted on GitHub) -->
<!-- ![SynthBot Demo](docs/synthbot-demo.mp4) -->

<!-- Option 3: GIF Demo -->
<!-- ![SynthBot Demo](docs/synthbot-demo.gif) -->

**[📺 Watch Full Demo](https://youtube.com/watch?v=YOUR_VIDEO_ID)** | **[🎬 Download Demo Video](docs/synthbot-demo.mp4)**

### What You'll See:
- 🎤 **Voice Input/Output** - Real-time speech interaction with natural conversations
- 🤖 **AI Processing** - Multi-platform AI responses and intelligent dialogue
- 🎨 **Cyberpunk UI** - Neon interface animations and smooth interactions
- ⚙️ **Advanced Features** - Quantum computing integration and data persistence
- 💾 **Data Management** - Automatic conversation saving and export features
- 🔮 **Quantum Features** - IBM Quantum-enhanced responses and insights

### Demo Highlights:
- Natural conversations about technology and capabilities
- Voice synthesis with multiple voice options
- AI service switching and quantum enhancements
- Real-time data persistence and conversation history
- Beautiful cyberpunk interface in action

## 🚀 Live Demo

**Try SynthBot Right Now!**

**[🎮 Google Drive Demo](https://drive.google.com/file/d/1zUyUvklKCyWpH5yV3ePxwaUw9Dk5K_2O/view?usp=sharing)**

Experience SynthBot's full capabilities with our interactive demo. The demo showcases:
- **Real-time voice interaction** with AI assistants
- **Multi-platform AI integration** (OpenAI, Anthropic, IBM Quantum)
- **High-quality speech synthesis** via ElevenLabs
- **Cyberpunk UI** with smooth animations
- **Data persistence** and conversation history
- **Quantum computing enhancements**

*Note: The demo requires API keys for full functionality. You can still explore the interface and use the enhanced local AI mode without keys.*

## 🌟 Features

### 🤖 Multi-AI Platform Support
- **OpenAI GPT-4/GPT-3.5** - Advanced language processing
- **Anthropic Claude** - Constitutional AI with safety focus
- **Enhanced Local AI** - Offline processing capabilities
- **IBM Quantum** - Quantum-enhanced responses and random number generation

### 🎤 Advanced Speech Synthesis
- **ElevenLabs** - High-quality, natural voice synthesis
- **OpenAI TTS** - Fast, reliable text-to-speech
- **Multiple Voice Options** - Rachel, Domi, Antoni, Josh, and more
- **Real-time Audio Processing** - Seamless voice interaction

### 🎨 Cyberpunk UI/UX
- **Neon Color Scheme** - Purple, cyan, and dark theme
- **Animated Elements** - Smooth transitions and effects
- **Responsive Design** - Works on desktop and mobile
- **Dark Mode** - Easy on the eyes for extended use

### 💾 Intelligent Data Management
- **File-Based Database** - JSON storage with organized structure
- **Automatic Data Export** - Complete data backup on exit
- **Conversation History** - Persistent chat sessions
- **API Usage Tracking** - Monitor service consumption
- **Audit Logging** - Complete activity trail

### 🔧 Advanced Configuration
- **API Key Management** - Secure storage and validation
- **Service Priority Selection** - Choose AI processing order
- **Voice Customization** - Select preferred speech synthesis
- **Quantum Integration** - Enable/disable quantum features

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** (for local server)
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)
- **API Keys** (optional, for full functionality):
  - OpenAI API Key
  - Anthropic API Key
  - ElevenLabs API Key
  - IBM Quantum API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/stix26/synthbot.git
   cd synthbot
   ```

2. **Start the local server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in your browser**
   ```
   http://localhost:8000
   ```

4. **Configure API Keys** (optional)
   - Enter your API keys in the UI
   - Select your preferred AI service
   - Choose your speech synthesis method

## 📖 Detailed Usage Guide

### Initial Setup

1. **First Launch**
   - The app will create a `synthbot_data/` directory
   - Initialize with default settings
   - Ready for immediate use with local AI

2. **API Configuration**
   - Click "Settings" to open configuration panel
   - Enter API keys for desired services
   - Test connections with "Validate" buttons
   - Save settings for persistent configuration

3. **Service Selection**
   - **AI Service Priority**: Choose processing order
     - OpenAI → Anthropic → Enhanced Local
     - Anthropic → OpenAI → Enhanced Local
     - Enhanced Local only
   - **Speech Synthesis**: Select voice method
     - ElevenLabs (highest quality)
     - OpenAI TTS (fastest)
     - Browser TTS (no API required)

### Conversation Features

1. **Starting a Chat**
   - Type your message in the input field
   - Press Enter or click "Send"
   - Watch the thinking animation
   - Receive AI response with voice synthesis

2. **Voice Interaction**
   - Click the microphone icon for voice input
   - Speak clearly into your microphone
   - Voice is converted to text automatically
   - AI responds with synthesized speech

3. **Quantum Enhancements**
   - Enable quantum features in settings
   - Receive quantum-enhanced responses
   - Get true random number generation
   - Experience quantum computing integration

### Advanced Features

1. **Conversation Management**
   - View conversation history
   - Export conversations as JSON
   - Clear chat history
   - Session persistence across browser sessions

2. **Data Export**
   - Automatic export on app close
   - Manual export via "Export Data" button
   - Complete data backup in `synthbot_data/`
   - Individual JSON files for each data type

3. **API Usage Monitoring**
   - Track API calls and tokens used
   - Monitor service success rates
   - View usage statistics
   - Cost estimation for paid services

## 🏗️ Architecture

### Frontend (HTML/CSS/JavaScript)
```
index.html          # Main application interface
├── Cyberpunk UI    # Neon-themed responsive design
├── Real-time Chat  # WebSocket-like communication
├── Voice Controls  # Speech input/output handling
└── Settings Panel  # Configuration management
```

### Backend Services
```
file_db.js          # File-based database system
├── Data Storage    # JSON file organization
├── Export System   # Complete data backup
├── API Integration # External service connections
└── Audit Logging   # Activity tracking
```

### Data Structure
```
synthbot_data/
├── api/
│   └── usage.json          # API call logs
├── conversations/
│   └── conversations.json  # Chat history
├── users/
│   └── users.json          # User accounts
├── system/
│   └── config.json         # Settings
├── voices/
│   └── voices.json         # Voice configurations
├── quantum/
│   └── sessions.json       # Quantum session data
├── logs/
│   └── audit.json          # Audit trail
└── export_*.json           # Complete data exports
```

## 🔧 Configuration

### Environment Variables (Optional)
```bash
# API Keys (can also be set via UI)
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
ELEVENLABS_API_KEY=your_elevenlabs_key
IBM_QUANTUM_API_KEY=your_ibm_quantum_key

# Server Configuration
PORT=8000
HOST=localhost
```

### Settings Panel Options
- **AI Service Priority**: Control which AI service processes requests
- **Speech Synthesis Method**: Choose voice generation method
- **Voice Selection**: Pick preferred voice for synthesis
- **Quantum Features**: Enable/disable quantum enhancements
- **Auto-save**: Toggle automatic data saving
- **Debug Mode**: Enable detailed logging

## 📊 Data Management

### Automatic Data Export
The system automatically exports all data when:
- Browser tab is closed
- Server is stopped
- Manual export is triggered
- Page is refreshed

### Export File Structure
```json
{
  "export_info": {
    "timestamp": "2025-06-23T23:02:49.575Z",
    "version": "1.0",
    "total_records": 13
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

### Data Privacy
- All data is stored locally
- No data is sent to external servers (except API calls)
- Export files contain only your conversation data
- API keys are stored securely in browser storage

## 🛠️ Development

### Project Structure
```
Synthbot/
├── index.html              # Main application
├── file_db.js              # Database management
├── database_connection.js  # SQL database interface
├── database_setup.sql      # Database schema
├── README.md              # This file
├── LICENSE                # MIT License
├── .gitignore            # Git ignore rules
├── synthbot_data/        # Data storage (auto-generated)
└── docs/                 # Documentation
```

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup
```bash
# Clone repository
git clone https://github.com/stix26/synthbot.git
cd synthbot

# Start development server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## 🔒 Security

### API Key Management
- Keys are stored in browser localStorage
- No keys are transmitted to external servers
- Keys are validated before use
- Secure key validation endpoints

### Data Protection
- All data stored locally
- No cloud synchronization
- Export files contain only user data
- No telemetry or tracking

## 🐛 Troubleshooting

### Common Issues

**Server won't start (Port 8000 in use)**
```bash
# Kill existing process
lsof -ti:8000 | xargs kill -9

# Or use different port
python3 -m http.server 8001
```

**Voice synthesis not working**
- Check API key validity
- Ensure microphone permissions
- Try different speech synthesis method
- Check browser console for errors

**AI responses not working**
- Verify API keys are entered
- Check internet connection
- Try enhanced local AI mode
- Review browser console for errors

**Data not saving**
- Check browser storage permissions
- Ensure `synthbot_data/` directory exists
- Try manual export
- Check file system permissions

### Debug Mode
Enable debug mode in settings to see:
- API call details
- Error messages
- Data flow information
- Performance metrics

## 📈 Performance

### Optimization Features
- **Lazy Loading**: Load data only when needed
- **Caching**: Cache API responses and voice data
- **Compression**: Compress export files
- **Efficient Storage**: Optimized JSON structure

### Resource Usage
- **Memory**: ~50MB typical usage
- **Storage**: ~1MB per 1000 messages
- **Network**: Minimal (API calls only)
- **CPU**: Low (voice processing only)

## 🤝 Support

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/stix26/synthbot/issues)
- **Discussions**: [GitHub Discussions](https://github.com/stix26/synthbot/discussions)
- **Wiki**: [Project Wiki](https://github.com/stix26/synthbot/wiki)

### Community
- **Discord**: [Join our Discord](https://discord.gg/synthbot)
- **Reddit**: [r/SynthBot](https://reddit.com/r/SynthBot)
- **Twitter**: [@SynthBotAI](https://twitter.com/SynthBotAI)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT models and TTS
- **Anthropic** for Claude AI
- **ElevenLabs** for voice synthesis
- **IBM** for quantum computing
- **Open Source Community** for inspiration and tools

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/stix26/synthbot)
![GitHub forks](https://img.shields.io/github/forks/stix26/synthbot)
![GitHub issues](https://img.shields.io/github/issues/stix26/synthbot)
![GitHub pull requests](https://img.shields.io/github/issues-pr/stix26/synthbot)

---

**Made with ❤️ by the SynthBot Team**

*Transform your conversations with AI-powered voice assistance* 