
export type MessageRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface AIRequestPayload {
  messages: Array<{
    role: MessageRole
    content: string
  }>
  repoContext: string
}

export interface AIResponse {
  content: string
  model: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}


export interface OpenRouterMessage {
  role: MessageRole
  content: string
}

export interface OpenRouterRequest {
  model: string
  messages: OpenRouterMessage[]
  temperature?: number
  max_tokens?: number
  stream?: boolean
}

export interface OpenRouterResponseChoice {
  message: {
    role: MessageRole
    content: string
  }
  finish_reason: string
  index: number
}

export interface OpenRouterResponse {
  id: string
  model: string
  choices: OpenRouterResponseChoice[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
