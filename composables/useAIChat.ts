import type { ChatMessage, AIRequestPayload, AIResponse } from '~/types/ai'
import type { AppError } from '~/types/app'
import { translations, type Locale } from '~/i18n/translations'

export function useAIChat() {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const error = ref<AppError | null>(null)

  function createMessage(role: ChatMessage['role'], content: string): ChatMessage {
    return {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      role,
      content,
      timestamp: new Date(),
    }
  }

  async function sendMessage(userInput: string, repoContext: string): Promise<void> {
    if (!userInput.trim() || isLoading.value) return

    error.value = null
    const userMsg = createMessage('user', userInput.trim())
    messages.value.push(userMsg)
    isLoading.value = true

    const assistantMsg = createMessage('assistant', '')
    assistantMsg.isStreaming = true
    messages.value.push(assistantMsg)

    try {
      const payload: AIRequestPayload = {
        messages: messages.value
          .filter((m) => !m.isStreaming)
          .map(({ role, content }) => ({ role, content })),
        repoContext,
      }

      const response = await $fetch<AIResponse>('/api/chat', {
        method: 'POST',
        body: payload,
      })

      const idx = messages.value.findIndex((m) => m.id === assistantMsg.id)
      if (idx !== -1) {
        messages.value[idx] = {
          ...messages.value[idx],
          content: response.content,
          isStreaming: false,
        }
      }
    } catch (err: unknown) {
      messages.value = messages.value.filter((m) => m.id !== assistantMsg.id)
      if (err && typeof err === 'object' && 'message' in err) {
        const fetchError = err as { message: string; statusCode?: number }
        error.value = {
          message: fetchError.message || 'Failed to get AI response',
          statusCode: fetchError.statusCode,
        }
      } else {
        error.value = { message: 'An unexpected error occurred' }
      }
    } finally {
      isLoading.value = false
    }
  }

  function clearMessages() {
    messages.value = []
    error.value = null
  }

  function addSystemGreeting(repoName: string, locale: Locale) {
    const t = translations[locale]
    const body = t.greetingAnalyzed.replace('{repo}', repoName)
    const content = `# ${t.greetingReady}\n\n${body}\n\n${t.greetingAskAbout}\n- ${t.greetingTopic1}\n- ${t.greetingTopic2}\n- ${t.greetingTopic3}\n- ${t.greetingTopic4}\n- ${t.greetingTopic5}\n- ${t.greetingTopic6}`
    messages.value = [createMessage('assistant', content)]
  }

  return {
    messages: readonly(messages),
    isLoading: readonly(isLoading),
    error: readonly(error),
    sendMessage,
    clearMessages,
    addSystemGreeting,
  }
}
