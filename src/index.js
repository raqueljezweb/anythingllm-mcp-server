#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';
import { AnythingLLMClient } from './client.js';
import { additionalTools } from './additional-tools.js';
import { handleAdditionalTools } from './additional-handlers.js';

const server = new Server(
  {
    name: 'anythingllm-mcp-server',
    vendor: 'anythingllm',
    version: '2.0.0',
    description: 'MCP server for AnythingLLM integration'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

let client = null;
let config = {
  apiKey: process.env.ANYTHINGLLM_API_KEY || null,
  baseUrl: process.env.ANYTHINGLLM_BASE_URL || 'http://localhost:3001'
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'initialize_anythingllm',
        description: 'Initialize the AnythingLLM client with API credentials',
        inputSchema: {
          type: 'object',
          properties: {
            apiKey: {
              type: 'string',
              description: 'Your AnythingLLM API key'
            },
            baseUrl: {
              type: 'string',
              description: 'AnythingLLM base URL (default: http://localhost:3001)'
            }
          },
          required: ['apiKey']
        }
      },
      {
        name: 'list_workspaces',
        description: 'List all available workspaces in AnythingLLM',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'get_workspace',
        description: 'Get details of a specific workspace',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The workspace slug/identifier'
            }
          },
          required: ['slug']
        }
      },
      {
        name: 'create_workspace',
        description: 'Create a new workspace',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the new workspace'
            }
          },
          required: ['name']
        }
      },
      {
        name: 'update_workspace',
        description: 'Update an existing workspace',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The workspace slug/identifier'
            },
            updates: {
              type: 'object',
              description: 'Object containing fields to update'
            }
          },
          required: ['slug', 'updates']
        }
      },
      {
        name: 'delete_workspace',
        description: 'Delete a workspace',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The workspace slug/identifier'
            }
          },
          required: ['slug']
        }
      },
      {
        name: 'chat_with_workspace',
        description: 'Send a chat message to a workspace',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The workspace slug/identifier'
            },
            message: {
              type: 'string',
              description: 'The message to send'
            },
            mode: {
              type: 'string',
              description: 'Chat mode (chat or query)',
              enum: ['chat', 'query'],
              default: 'chat'
            }
          },
          required: ['slug', 'message']
        }
      },
      {
        name: 'list_documents',
        description: 'List all documents in a workspace',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The workspace slug/identifier'
            }
          },
          required: ['slug']
        }
      },
      {
        name: 'delete_document',
        description: 'Delete a document from a workspace',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description: 'The workspace slug/identifier'
            },
            documentId: {
              type: 'string',
              description: 'The document ID to delete'
            }
          },
          required: ['slug', 'documentId']
        }
      },
      {
        name: 'get_system_settings',
        description: 'Get system settings',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'update_system_settings',
        description: 'Update system settings',
        inputSchema: {
          type: 'object',
          properties: {
            settings: {
              type: 'object',
              description: 'Settings object to update'
            }
          },
          required: ['settings']
        }
      },
      ...additionalTools
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;
    
    switch (name) {
      case 'initialize_anythingllm':
        config.apiKey = args.apiKey;
        if (args.baseUrl) {
          config.baseUrl = args.baseUrl;
        }
        client = new AnythingLLMClient(config.baseUrl, config.apiKey);
        result = { 
          message: 'AnythingLLM client initialized successfully',
          baseUrl: config.baseUrl 
        };
        break;
        
      case 'list_workspaces':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.listWorkspaces();
        break;
        
      case 'get_workspace':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.getWorkspace(args.slug);
        break;
        
      case 'create_workspace':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.createWorkspace(args.name);
        break;
        
      case 'update_workspace':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.updateWorkspace(args.slug, args.updates);
        break;
        
      case 'delete_workspace':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.deleteWorkspace(args.slug);
        break;
        
      case 'chat_with_workspace':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.chatWithWorkspace(args.slug, args.message, args.mode || 'chat');
        break;
        
      case 'list_documents':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.listDocuments(args.slug);
        break;
        
      case 'delete_document':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.deleteDocument(args.slug, args.documentId);
        break;
        
      case 'get_system_settings':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.getSystemSettings();
        break;
        
      case 'update_system_settings':
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await client.updateSystemSettings(args.settings);
        break;
        
      default:
        // Try additional tools
        if (!client) {
          throw new Error('AnythingLLM client not initialized. Please run initialize_anythingllm first.');
        }
        result = await handleAdditionalTools(name, args, client);
        if (result === null) {
          throw new Error(`Unknown tool: ${name}`);
        }
    }
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`
        }
      ],
      isError: true
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('AnythingLLM MCP Server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});