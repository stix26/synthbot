# Contributing to SynthBot 🤖

Thank you for your interest in contributing to SynthBot! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a pull request

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Feature Requests](#feature-requests)
- [Documentation](#documentation)

## 🤝 Code of Conduct

### Our Standards

We are committed to providing a welcoming and inspiring community for all. By participating in this project, you agree to:

- **Be respectful** and inclusive of all contributors
- **Be collaborative** and open to different viewpoints
- **Be constructive** in feedback and criticism
- **Be professional** in all interactions

### Unacceptable Behavior

- Harassment, discrimination, or offensive behavior
- Trolling, insulting, or derogatory comments
- Publishing others' private information without permission
- Any conduct inappropriate in a professional setting

## 🛠️ Getting Started

### Prerequisites

- **Git** - Version control
- **Python 3.8+** - For local development server
- **Modern Web Browser** - Chrome, Firefox, Safari, Edge
- **Text Editor/IDE** - VS Code, Sublime Text, etc.

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/synthbot.git
cd synthbot

# Add upstream remote
git remote add upstream https://github.com/original-owner/synthbot.git
```

### Development Setup

```bash
# Start development server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## 💻 Development Setup

### Project Structure

```
synthbot/
├── index.html              # Main application
├── file_db.js              # Database management
├── database_connection.js  # SQL database interface
├── database_setup.sql      # Database schema
├── README.md              # Project documentation
├── CONTRIBUTING.md        # This file
├── LICENSE                # MIT License
├── .gitignore            # Git ignore rules
└── synthbot_data/        # Data storage (auto-generated)
```

### Key Files to Understand

- **`index.html`** - Main application interface and logic
- **`file_db.js`** - File-based database system
- **`database_connection.js`** - SQL database interface
- **`database_setup.sql`** - Database schema definition

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow coding standards
   - Add tests if applicable
   - Update documentation

3. **Test your changes**
   ```bash
   # Start development server
   python3 -m http.server 8000
   
   # Test in browser
   open http://localhost:8000
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Coding Standards

### JavaScript

- **ES6+** syntax preferred
- **2 spaces** for indentation
- **Semicolons** required
- **Single quotes** for strings
- **Camel case** for variables and functions
- **Pascal case** for classes

```javascript
// Good
const apiKey = 'your-api-key';
const processMessage = (message) => {
  return message.trim();
};

class SynthBot {
  constructor() {
    this.isActive = true;
  }
}

// Bad
var api_key = "your-api-key"
function process_message(message) {
  return message.trim()
}
```

### HTML

- **Semantic HTML5** elements
- **Accessibility** attributes
- **Consistent indentation**
- **Descriptive class names**

```html
<!-- Good -->
<main class="synthbot-container">
  <section class="chat-interface">
    <h1 class="app-title">SynthBot</h1>
    <div class="message-container" role="log" aria-live="polite">
      <!-- Messages -->
    </div>
  </section>
</main>

<!-- Bad -->
<div class="container">
  <div class="chat">
    <div class="title">SynthBot</div>
    <div class="messages">
      <!-- Messages -->
    </div>
  </div>
</div>
```

### CSS

- **BEM methodology** for class naming
- **Mobile-first** responsive design
- **CSS custom properties** for theming
- **Consistent spacing** and typography

```css
/* Good */
.synthbot {
  --primary-color: #8b5cf6;
  --secondary-color: #06b6d4;
  --background-color: #0f0f23;
}

.synthbot__chat-interface {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.synthbot__message {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--background-color);
}

.synthbot__message--user {
  align-self: flex-end;
  background-color: var(--primary-color);
}

/* Bad */
.container {
  display: flex;
  flex-direction: column;
}

.message {
  padding: 10px;
  border-radius: 5px;
  background: #0f0f23;
}

.user-message {
  align-self: flex-end;
  background: #8b5cf6;
}
```

## 🧪 Testing

### Manual Testing

Before submitting a pull request, test:

1. **Basic Functionality**
   - App loads without errors
   - Chat interface works
   - Voice input/output functions
   - Settings panel opens/closes

2. **API Integration**
   - API key validation
   - AI service responses
   - Speech synthesis
   - Error handling

3. **Data Management**
   - Data saving/loading
   - Export functionality
   - Conversation persistence
   - File database operations

4. **Cross-browser Compatibility**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers
   - Different screen sizes

### Automated Testing

```bash
# Run linting (if ESLint is configured)
npm run lint

# Run tests (if test framework is added)
npm test
```

## 🔄 Pull Request Process

### Before Submitting

1. **Ensure your code works**
   - Test all functionality
   - Check for errors in console
   - Verify data persistence

2. **Follow coding standards**
   - Consistent formatting
   - Proper naming conventions
   - Clear comments

3. **Update documentation**
   - README.md if needed
   - Code comments
   - API documentation

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Testing
- [ ] Manual testing completed
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] API integration tested

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No console errors
- [ ] Data persistence works
```

### Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Testing** by maintainers
4. **Approval** and merge

## 🐛 Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: [e.g. Chrome 91]
- OS: [e.g. macOS 12.0]
- SynthBot Version: [e.g. 1.0.0]

## Console Errors
Any error messages from browser console

## Screenshots
If applicable, add screenshots
```

### Feature Requests

Use the feature request template:

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why this feature is needed

## Proposed Solution
How you think it should work

## Alternatives Considered
Other approaches you considered

## Additional Context
Any other relevant information
```

## 💡 Feature Requests

### Guidelines

- **Be specific** about the feature
- **Explain the use case**
- **Consider implementation**
- **Check existing issues**

### Good Feature Requests

- "Add support for custom voice models"
- "Implement conversation export to PDF"
- "Add keyboard shortcuts for common actions"
- "Create a mobile app version"

### Poor Feature Requests

- "Make it better"
- "Add more features"
- "Fix everything"
- "Make it like [other app]"

## 📚 Documentation

### Code Documentation

- **JSDoc** comments for functions
- **Inline comments** for complex logic
- **README updates** for new features
- **API documentation** for endpoints

```javascript
/**
 * Processes user input and generates AI response
 * @param {string} userInput - The user's message
 * @param {string} aiService - The AI service to use
 * @returns {Promise<Object>} Response object with text and audio
 */
async function processUserInput(userInput, aiService) {
  // Implementation
}
```

### User Documentation

- **README.md** - Main project documentation
- **CONTRIBUTING.md** - This file
- **API.md** - API documentation
- **CHANGELOG.md** - Version history

## 🏷️ Commit Messages

### Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- **feat** - New feature
- **fix** - Bug fix
- **docs** - Documentation changes
- **style** - Code style changes
- **refactor** - Code refactoring
- **test** - Adding tests
- **chore** - Maintenance tasks

### Examples

```bash
feat(chat): add voice input support
fix(api): resolve OpenAI API timeout issue
docs(readme): update installation instructions
style(ui): improve button styling
refactor(db): optimize database queries
test(voice): add voice synthesis tests
chore(deps): update dependencies
```

## 🎯 Getting Help

### Resources

- **GitHub Issues** - For bugs and feature requests
- **GitHub Discussions** - For questions and ideas
- **Documentation** - README and code comments
- **Community** - Discord, Reddit, etc.

### Contact

- **Maintainers** - @maintainer-username
- **Discord** - [Join our Discord](https://discord.gg/synthbot)
- **Email** - synthbot@example.com

## 🙏 Recognition

Contributors will be recognized in:

- **README.md** contributors section
- **GitHub contributors** page
- **Release notes** for significant contributions
- **Project documentation**

---

**Thank you for contributing to SynthBot! 🚀**

*Together, we're building the future of AI voice assistants.* 