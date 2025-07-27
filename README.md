# AnythingLLM MCP Server

An MCP (Model Context Protocol) server that enables seamless integration between [AnythingLLM](https://anythingllm.com/) and MCP-compatible clients like [TypingMind](https://typingmind.com/), [Claude Desktop](https://claude.ai/download), and more.

## Features

- 🚀 **Full AnythingLLM API Integration**: Access all major AnythingLLM features through MCP
- 💬 **Workspace Management**: Create, update, delete, and list workspaces
- 🤖 **Chat Integration**: Send messages to workspaces and receive AI responses
- 📄 **Document Management**: List and delete documents in workspaces
- ⚙️ **System Settings**: View and update AnythingLLM system configuration
- 🔐 **Secure Authentication**: API key-based authentication

## Prerequisites

- Node.js 18+ installed
- AnythingLLM instance running with API access enabled
- AnythingLLM API key (obtain from your AnythingLLM instance at `/settings/api-keys`)

## Installation

### Option 1: Using npx (Recommended)

No installation needed! You can run the server directly with npx when configuring your MCP client.

### Option 2: Global Installation

```bash
npm install -g anythingllm-mcp-server
```

### Option 3: Local Installation

```bash
git clone https://github.com/yourusername/anythingllm-mcp-server.git
cd anythingllm-mcp-server
npm install
```

## Configuration

### For TypingMind.com

#### Setup Instructions

1. Go to [TypingMind.com](https://www.typingmind.com/)
2. Click on **Settings** → **MCP Servers**
3. In the MCP configuration editor, add the AnythingLLM server:

   ```json
   {
    "mcpServers": {
      "anythingllm": {
        "command": "npx",
        "args": ["-y", "anythingllm-mcp-server@1.0.3"]
      }
    }
  }
   ```

4. Click **Save** - TypingMind will restart the MCP servers
5. Look for the "Connected" status

#### First Time Usage

After the server connects, initialize it with your AnythingLLM credentials:

1. In the chat, type:
   ```
   Use the initialize_anythingllm tool with apiKey: "your-api-key" and baseUrl: "http://localhost:3001"
   ```

2. Replace:
   - `"your-api-key"` with your AnythingLLM API key (get it from AnythingLLM → Settings → API Keys)
   - `"http://localhost:3001"` with your AnythingLLM instance URL

3. You'll see: "AnythingLLM client initialized successfully"

#### Example Commands

After initialization, use natural language to interact with AnythingLLM:

- "List all my workspaces"
- "Create a new workspace called 'Project Documentation'"
- "Chat with the 'research' workspace about the latest findings"
- "Show me all documents in the 'knowledge-base' workspace"

TypingMind will automatically use the appropriate AnythingLLM tools.

### For Claude Desktop

Add to your Claude Desktop configuration file:

**On macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**On Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "anythingllm": {
      "command": "npx",
      "args": ["-y", "anythingllm-mcp-server@1.0.3"]
    }
  }
}
```

## Initialization

When first using the server in your MCP client, you'll need to initialize it with your AnythingLLM credentials by calling the `initialize_anythingllm` tool:

```
Use the initialize_anythingllm tool with apiKey: "your-api-key" and baseUrl: "http://localhost:3001"
```

- **apiKey**: Get this from your AnythingLLM instance at `/settings/api-keys`
- **baseUrl**: Your AnythingLLM instance URL (default: `http://localhost:3001`)

You can also set these as environment variables:
- `ANYTHINGLLM_API_KEY`: Your API key
- `ANYTHINGLLM_BASE_URL`: Your instance URL

## Available Tools

### Initialization

| Tool | Description | Parameters |
|------|-------------|------------|
| `initialize_anythingllm` | Initialize the AnythingLLM client with API credentials | `apiKey` (string), `baseUrl` (optional string) |

### Workspace Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_workspaces` | Get all workspaces | None |
| `get_workspace` | Get details of a specific workspace | `slug` (string) |
| `create_workspace` | Create a new workspace | `name` (string) |
| `update_workspace` | Update workspace settings | `slug` (string), `updates` (object) |
| `delete_workspace` | Remove a workspace | `slug` (string) |

### Chat Operations

| Tool | Description | Parameters |
|------|-------------|------------|
| `chat_with_workspace` | Send messages to a workspace | `slug` (string), `message` (string), `mode` (optional: "chat" or "query") |

### Document Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_documents` | View all documents in a workspace | `slug` (string) |
| `delete_document` | Remove a document from a workspace | `slug` (string), `documentId` (string) |

### System Administration

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_system_settings` | View system configuration | None |
| `update_system_settings` | Modify system settings | `settings` (object) |

## Usage Examples

Once configured, you can interact with AnythingLLM through your MCP client:

### List all workspaces
```
"Use the list_workspaces tool to show me all available workspaces"
```

### Create a new workspace
```
"Create a new workspace called 'Project Documentation' using the create_workspace tool"
```

### Chat with a workspace
```
"Use chat_with_workspace to ask the 'research' workspace: What are the key findings from the latest report?"
```

### Manage documents
```
"List all documents in the 'knowledge-base' workspace"
"Delete document with ID 'doc123' from the 'archive' workspace"
```

## API Reference

This MCP server connects to the following AnythingLLM API endpoints:

- `/api/v1/workspaces` - Workspace operations
- `/api/v1/workspace/{slug}/chat` - Chat functionality
- `/api/v1/workspace/{slug}/documents` - Document management
- `/api/v1/system/settings` - System configuration

For complete API documentation, visit `/api/docs` on your AnythingLLM instance.

## Troubleshooting

### Connection Issues
- ✅ Ensure your AnythingLLM instance is running and accessible
- ✅ Verify the API key has proper permissions
- ✅ Check that the base URL is correct (include http/https)
- ✅ Make sure the AnythingLLM API is enabled in your instance

### API Errors
- Most errors will include descriptive messages
- Check AnythingLLM logs for detailed error information
- Ensure your API key hasn't expired
- Verify workspace slugs are correct when accessing specific workspaces

### Common Issues

**"Client not initialized" error:**
- Make sure you've initialized the server with your API key and base URL

**"Workspace not found" error:**
- Check that the workspace slug is correct
- Use `list_workspaces` to see available workspaces

**Connection refused:**
- Verify AnythingLLM is running on the specified port
- Check firewall settings

## Security Notes

- 🔐 Keep your API key secure and never commit it to version control
- 🔒 Use environment variables for sensitive configuration in production
- 🛡️ Restrict API key permissions to only what's needed
- ⚠️ Never share your API key publicly

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/anythingllm-mcp-server/issues)
- 📖 **AnythingLLM Docs**: [docs.useanything.com](https://docs.useanything.com)
- 💬 **AnythingLLM Community**: [Discord](https://discord.gg/anythingllm)

## Acknowledgments

- [AnythingLLM](https://anythingllm.com/) by Mintplex Labs
- [Model Context Protocol](https://modelcontext.dev/) by Anthropic
- [TypingMind](https://typingmind.com/) for MCP support

---

Made with ❤️ for the AnythingLLM community
