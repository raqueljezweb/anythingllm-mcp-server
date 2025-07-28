# AnythingLLM MCP Server

An MCP (Model Context Protocol) server that enables seamless integration between [AnythingLLM](https://anythingllm.com/) and MCP-compatible clients like [TypingMind](https://typingmind.com/), [Claude Desktop](https://claude.ai/download), and more.

## Features

- 🚀 **Complete AnythingLLM API Integration**: Access all AnythingLLM features through MCP
- 💬 **Workspace Management**: Create, update, delete, list workspaces and manage their settings
- 🤖 **Chat Integration**: Send messages, manage chat history, and stream responses
- 📄 **Document Management**: Upload, list, delete documents, process URLs, and manage vectors
- 🔍 **Embedding & Search**: Embed text/webpages and search within workspaces
- 👥 **User Management**: Create, update, delete users and manage permissions
- 🔑 **API Key Management**: Programmatically manage API keys
- ⚙️ **System Administration**: Configure LLM providers, vector databases, and system settings
- 🤖 **Agent Support**: Create and manage AI agents with custom prompts and tools
- 📊 **System Monitoring**: Access system information and statistics
- 🔐 **Secure Authentication**: API key-based authentication with environment variable support

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
| `get_workspace_settings` | Get settings for a specific workspace | `slug` (string) |
| `update_workspace_settings` | Update workspace-specific settings | `slug` (string), `settings` (object) |

### Chat Operations

| Tool | Description | Parameters |
|------|-------------|------------|
| `chat_with_workspace` | Send messages to a workspace | `slug` (string), `message` (string), `mode` (optional: "chat" or "query") |
| `get_chat_history` | Get chat history for a workspace | `slug` (string), `limit` (optional number) |
| `clear_chat_history` | Clear all chat history for a workspace | `slug` (string) |

### Document Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_documents` | View all documents in a workspace | `slug` (string) |
| `delete_document` | Remove a document from a workspace | `slug` (string), `documentId` (string) |
| `process_document_url` | Process a document from a URL | `slug` (string), `url` (string) |
| `get_document_vectors` | Get vector embeddings for a document | `slug` (string), `documentId` (string) |

### Embedding & Search

| Tool | Description | Parameters |
|------|-------------|------------|
| `embed_text` | Embed text directly into a workspace | `slug` (string), `texts` (array of strings) |
| `embed_webpage` | Embed a webpage into a workspace | `slug` (string), `url` (string) |
| `search_workspace` | Search within a workspace | `slug` (string), `query` (string), `limit` (optional number) |

### User Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_users` | List all users in the system | None |
| `create_user` | Create a new user | `username` (string), `password` (string), `role` (optional string) |
| `update_user` | Update an existing user | `userId` (string), `updates` (object) |
| `delete_user` | Delete a user | `userId` (string) |

### API Key Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_api_keys` | List all API keys | None |
| `create_api_key` | Create a new API key | `name` (string) |
| `delete_api_key` | Delete an API key | `keyId` (string) |

### System Administration

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_system_settings` | View system configuration | None |
| `update_system_settings` | Modify system settings | `settings` (object) |
| `get_system_info` | Get general system information | None |
| `get_system_stats` | Get system statistics | None |

### LLM Provider Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_llm_providers` | List available LLM providers | None |
| `update_llm_provider` | Update LLM provider configuration | `provider` (string), `apiKey` (optional string), `model` (optional string) |

### Vector Database Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `get_vector_database_info` | Get vector database configuration | None |
| `update_vector_database` | Update vector database configuration | `provider` (string), `config` (object) |

### Agent Management

| Tool | Description | Parameters |
|------|-------------|------------|
| `list_agents` | List all available agents | None |
| `create_agent` | Create a new agent | `name` (string), `systemPrompt` (optional string), `tools` (optional array) |
| `update_agent` | Update an existing agent | `agentId` (string), `updates` (object) |
| `delete_agent` | Delete an agent | `agentId` (string) |
| `invoke_agent` | Invoke an agent with input | `agentId` (string), `input` (string) |

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
