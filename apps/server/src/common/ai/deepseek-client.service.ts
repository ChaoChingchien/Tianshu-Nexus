import { Injectable, Logger } from '@nestjs/common';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  response_format?: { type: 'json_object' | 'text' };
}

@Injectable()
export class DeepSeekClientService {
  private readonly logger = new Logger(DeepSeekClientService.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.deepseek.com/v1';
  private readonly defaultModel = 'deepseek-chat';

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    if (!this.apiKey) {
      this.logger.warn('DEEPSEEK_API_KEY not set — AI endpoints will fall back to mock data');
    }
  }

  async chatCompletion(
    messages: ChatMessage[],
    options?: { temperature?: number; maxTokens?: number; jsonMode?: boolean },
  ): Promise<string | null> {
    if (!this.apiKey) return null;

    try {
      const body: ChatCompletionRequest = {
        model: this.defaultModel,
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.maxTokens ?? 2048,
      };

      if (options?.jsonMode) {
        body.response_format = { type: 'json_object' };
      }

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        this.logger.error(`DeepSeek API error ${response.status}: ${errorBody}`);
        return null;
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || null;
    } catch (error: any) {
      this.logger.error(`DeepSeek API call failed: ${error.message}`);
      return null;
    }
  }
}
