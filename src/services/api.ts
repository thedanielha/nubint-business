const API_BASE_URL = 'https://natural-toucan-definitely.ngrok-free.app/api/business';

export interface CanvasBlock {
  id: string;
  title: string;
  content: string[];
  placeholder: string;
}

export interface BusinessCanvas {
  id?: string;
  name?: string;
  key_partners: CanvasBlock;
  key_activities: CanvasBlock;
  key_resources: CanvasBlock;
  value_propositions: CanvasBlock;
  customer_relationships: CanvasBlock;
  channels: CanvasBlock;
  customer_segments: CanvasBlock;
  cost_structure: CanvasBlock;
  revenue_streams: CanvasBlock;
  created_at?: string;
  updated_at?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  responseObject?: T;
  statusCode: number;
}

export class CanvasAPI {
  static async generateCanvas(prompt: string, name?: string): Promise<BusinessCanvas> {
    const response = await fetch(`${API_BASE_URL}/canvas/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, name }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate canvas');
    }

    const data: ApiResponse<BusinessCanvas> = await response.json();
    if (!data.success || !data.responseObject) {
      throw new Error(data.message || 'Failed to generate canvas');
    }

    return data.responseObject;
  }

  static async listCanvases(): Promise<BusinessCanvas[]> {
    const response = await fetch(`${API_BASE_URL}/canvas`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch canvases');
    }

    const data: ApiResponse<BusinessCanvas[]> = await response.json();
    if (!data.success || !data.responseObject) {
      throw new Error(data.message || 'Failed to fetch canvases');
    }

    return data.responseObject;
  }

  static async getCanvas(id: string): Promise<BusinessCanvas> {
    const response = await fetch(`${API_BASE_URL}/canvas/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch canvas');
    }

    const data: ApiResponse<BusinessCanvas> = await response.json();
    if (!data.success || !data.responseObject) {
      throw new Error(data.message || 'Failed to fetch canvas');
    }

    return data.responseObject;
  }

  static async updateCanvas(id: string, updates: Partial<BusinessCanvas>): Promise<BusinessCanvas> {
    const response = await fetch(`${API_BASE_URL}/canvas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Failed to update canvas');
    }

    const data: ApiResponse<BusinessCanvas> = await response.json();
    if (!data.success || !data.responseObject) {
      throw new Error(data.message || 'Failed to update canvas');
    }

    return data.responseObject;
  }

  static async deleteCanvas(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/canvas/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete canvas');
    }

    const data: ApiResponse<null> = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete canvas');
    }
  }

  static async duplicateCanvas(id: string): Promise<BusinessCanvas> {
    const response = await fetch(`${API_BASE_URL}/canvas/${id}/duplicate`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to duplicate canvas');
    }

    const data: ApiResponse<BusinessCanvas> = await response.json();
    if (!data.success || !data.responseObject) {
      throw new Error(data.message || 'Failed to duplicate canvas');
    }

    return data.responseObject;
  }
}