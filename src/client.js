import fetch from 'node-fetch';

export class AnythingLLMClient {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiKey = apiKey;
    this.headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.headers,
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AnythingLLM API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async listWorkspaces() {
    return this.request('/api/v1/workspaces');
  }

  async getWorkspace(slug) {
    return this.request(`/api/v1/workspace/${slug}`);
  }

  async createWorkspace(name) {
    return this.request('/api/v1/workspace/new', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
  }

  async updateWorkspace(slug, updates) {
    return this.request(`/api/v1/workspace/${slug}/update`, {
      method: 'POST',
      body: JSON.stringify(updates)
    });
  }

  async deleteWorkspace(slug) {
    return this.request(`/api/v1/workspace/${slug}`, {
      method: 'DELETE'
    });
  }

  async chatWithWorkspace(slug, message, mode = 'chat') {
    return this.request(`/api/v1/workspace/${slug}/chat`, {
      method: 'POST',
      body: JSON.stringify({ message, mode })
    });
  }

  async streamChatWithWorkspace(slug, message, mode = 'chat') {
    const url = `${this.baseUrl}/api/v1/workspace/${slug}/stream-chat`;
    const response = await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ message, mode })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`AnythingLLM API error: ${response.status} - ${error}`);
    }

    return response.body;
  }

  async uploadDocument(workspaceSlug, documentData) {
    const formData = new FormData();
    formData.append('file', documentData.file);
    
    return this.request(`/api/v1/workspace/${workspaceSlug}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: formData
    });
  }

  async listDocuments(workspaceSlug) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/documents`);
  }

  async deleteDocument(workspaceSlug, documentId) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/document/${documentId}`, {
      method: 'DELETE'
    });
  }

  async getSystemSettings() {
    return this.request('/api/v1/system/settings');
  }

  async updateSystemSettings(settings) {
    return this.request('/api/v1/system/settings', {
      method: 'POST',
      body: JSON.stringify(settings)
    });
  }

  // User Management
  async listUsers() {
    return this.request('/api/v1/users');
  }

  async createUser(userData) {
    return this.request('/api/v1/users/new', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async updateUser(userId, updates) {
    return this.request(`/api/v1/users/${userId}`, {
      method: 'POST',
      body: JSON.stringify(updates)
    });
  }

  async deleteUser(userId) {
    return this.request(`/api/v1/users/${userId}`, {
      method: 'DELETE'
    });
  }

  // API Key Management
  async listApiKeys() {
    return this.request('/api/v1/api-keys');
  }

  async createApiKey(name) {
    return this.request('/api/v1/api-key/new', {
      method: 'POST',
      body: JSON.stringify({ name })
    });
  }

  async deleteApiKey(keyId) {
    return this.request(`/api/v1/api-key/${keyId}`, {
      method: 'DELETE'
    });
  }

  // Embedding Management
  async embedTextInWorkspace(workspaceSlug, texts) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/embed`, {
      method: 'POST',
      body: JSON.stringify({ texts })
    });
  }

  async embedWebpage(workspaceSlug, url) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/embed-webpage`, {
      method: 'POST',
      body: JSON.stringify({ url })
    });
  }

  // Chat History
  async getWorkspaceChatHistory(workspaceSlug, limit = 100) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/chats?limit=${limit}`);
  }

  async clearWorkspaceChatHistory(workspaceSlug) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/chats`, {
      method: 'DELETE'
    });
  }

  // System Information
  async getSystemInfo() {
    return this.request('/api/v1/system');
  }

  async getSystemStats() {
    return this.request('/api/v1/system/stats');
  }

  // LLM Provider Management
  async listLLMProviders() {
    return this.request('/api/v1/system/llm-providers');
  }

  async updateLLMProvider(provider, config) {
    return this.request('/api/v1/system/llm-provider', {
      method: 'POST',
      body: JSON.stringify({ provider, ...config })
    });
  }

  // Vector Database Management
  async getVectorDatabaseInfo() {
    return this.request('/api/v1/system/vector-database');
  }

  async updateVectorDatabase(config) {
    return this.request('/api/v1/system/vector-database', {
      method: 'POST',
      body: JSON.stringify(config)
    });
  }

  // Workspace Settings
  async getWorkspaceSettings(workspaceSlug) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/settings`);
  }

  async updateWorkspaceSettings(workspaceSlug, settings) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/settings`, {
      method: 'POST',
      body: JSON.stringify(settings)
    });
  }

  // Document Processing
  async processDocument(workspaceSlug, documentUrl) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/process-document`, {
      method: 'POST',
      body: JSON.stringify({ url: documentUrl })
    });
  }

  async getDocumentVectors(workspaceSlug, documentId) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/document/${documentId}/vectors`);
  }

  // Search
  async searchWorkspace(workspaceSlug, query, limit = 10) {
    return this.request(`/api/v1/workspace/${workspaceSlug}/search`, {
      method: 'POST',
      body: JSON.stringify({ query, limit })
    });
  }

  // Agents (if supported)
  async listAgents() {
    return this.request('/api/v1/agents');
  }

  async createAgent(agentData) {
    return this.request('/api/v1/agents/new', {
      method: 'POST',
      body: JSON.stringify(agentData)
    });
  }

  async updateAgent(agentId, updates) {
    return this.request(`/api/v1/agents/${agentId}`, {
      method: 'POST',
      body: JSON.stringify(updates)
    });
  }

  async deleteAgent(agentId) {
    return this.request(`/api/v1/agents/${agentId}`, {
      method: 'DELETE'
    });
  }

  async invokeAgent(agentId, input) {
    return this.request(`/api/v1/agents/${agentId}/invoke`, {
      method: 'POST',
      body: JSON.stringify({ input })
    });
  }
}