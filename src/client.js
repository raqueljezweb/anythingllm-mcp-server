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
}