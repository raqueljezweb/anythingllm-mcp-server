export const additionalTools = [
  // User Management
  {
    name: 'list_users',
    description: 'List all users in the system',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'create_user',
    description: 'Create a new user',
    inputSchema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'Username for the new user'
        },
        password: {
          type: 'string',
          description: 'Password for the new user'
        },
        role: {
          type: 'string',
          description: 'User role (admin, user, etc.)'
        }
      },
      required: ['username', 'password']
    }
  },
  {
    name: 'update_user',
    description: 'Update an existing user',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'ID of the user to update'
        },
        updates: {
          type: 'object',
          description: 'Object containing fields to update'
        }
      },
      required: ['userId', 'updates']
    }
  },
  {
    name: 'delete_user',
    description: 'Delete a user',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'ID of the user to delete'
        }
      },
      required: ['userId']
    }
  },

  // API Key Management
  {
    name: 'list_api_keys',
    description: 'List all API keys',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'create_api_key',
    description: 'Create a new API key',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name for the API key'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'delete_api_key',
    description: 'Delete an API key',
    inputSchema: {
      type: 'object',
      properties: {
        keyId: {
          type: 'string',
          description: 'ID of the API key to delete'
        }
      },
      required: ['keyId']
    }
  },

  // Embedding Management
  {
    name: 'embed_text',
    description: 'Embed text directly into a workspace',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The workspace slug/identifier'
        },
        texts: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'Array of text strings to embed'
        }
      },
      required: ['slug', 'texts']
    }
  },
  {
    name: 'embed_webpage',
    description: 'Embed a webpage into a workspace',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The workspace slug/identifier'
        },
        url: {
          type: 'string',
          description: 'URL of the webpage to embed'
        }
      },
      required: ['slug', 'url']
    }
  },

  // Chat History
  {
    name: 'get_chat_history',
    description: 'Get chat history for a workspace',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The workspace slug/identifier'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of chats to return',
          default: 100
        }
      },
      required: ['slug']
    }
  },
  {
    name: 'clear_chat_history',
    description: 'Clear all chat history for a workspace',
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

  // System Information
  {
    name: 'get_system_info',
    description: 'Get general system information',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'get_system_stats',
    description: 'Get system statistics',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },

  // LLM Provider Management
  {
    name: 'list_llm_providers',
    description: 'List available LLM providers',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'update_llm_provider',
    description: 'Update LLM provider configuration',
    inputSchema: {
      type: 'object',
      properties: {
        provider: {
          type: 'string',
          description: 'Provider name (openai, anthropic, etc.)'
        },
        apiKey: {
          type: 'string',
          description: 'API key for the provider'
        },
        model: {
          type: 'string',
          description: 'Model to use'
        }
      },
      required: ['provider']
    }
  },

  // Vector Database Management
  {
    name: 'get_vector_database_info',
    description: 'Get vector database configuration',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'update_vector_database',
    description: 'Update vector database configuration',
    inputSchema: {
      type: 'object',
      properties: {
        provider: {
          type: 'string',
          description: 'Vector database provider'
        },
        config: {
          type: 'object',
          description: 'Configuration object for the provider'
        }
      },
      required: ['provider', 'config']
    }
  },

  // Workspace Settings
  {
    name: 'get_workspace_settings',
    description: 'Get settings for a specific workspace',
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
    name: 'update_workspace_settings',
    description: 'Update settings for a specific workspace',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The workspace slug/identifier'
        },
        settings: {
          type: 'object',
          description: 'Settings object to update'
        }
      },
      required: ['slug', 'settings']
    }
  },

  // Document Processing
  {
    name: 'process_document_url',
    description: 'Process a document from a URL',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The workspace slug/identifier'
        },
        url: {
          type: 'string',
          description: 'URL of the document to process'
        }
      },
      required: ['slug', 'url']
    }
  },
  {
    name: 'get_document_vectors',
    description: 'Get vector embeddings for a document',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The workspace slug/identifier'
        },
        documentId: {
          type: 'string',
          description: 'ID of the document'
        }
      },
      required: ['slug', 'documentId']
    }
  },

  // Search
  {
    name: 'search_workspace',
    description: 'Search within a workspace',
    inputSchema: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
          description: 'The workspace slug/identifier'
        },
        query: {
          type: 'string',
          description: 'Search query'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results',
          default: 10
        }
      },
      required: ['slug', 'query']
    }
  },

  // Agent Management
  {
    name: 'list_agents',
    description: 'List all available agents',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'create_agent',
    description: 'Create a new agent',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Name of the agent'
        },
        systemPrompt: {
          type: 'string',
          description: 'System prompt for the agent'
        },
        tools: {
          type: 'array',
          items: {
            type: 'string'
          },
          description: 'List of tools the agent can use'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'update_agent',
    description: 'Update an existing agent',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: {
          type: 'string',
          description: 'ID of the agent to update'
        },
        updates: {
          type: 'object',
          description: 'Object containing fields to update'
        }
      },
      required: ['agentId', 'updates']
    }
  },
  {
    name: 'delete_agent',
    description: 'Delete an agent',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: {
          type: 'string',
          description: 'ID of the agent to delete'
        }
      },
      required: ['agentId']
    }
  },
  {
    name: 'invoke_agent',
    description: 'Invoke an agent with input',
    inputSchema: {
      type: 'object',
      properties: {
        agentId: {
          type: 'string',
          description: 'ID of the agent to invoke'
        },
        input: {
          type: 'string',
          description: 'Input to send to the agent'
        }
      },
      required: ['agentId', 'input']
    }
  }
];