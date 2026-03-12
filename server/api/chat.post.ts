import type { AIRequestPayload } from '~/types/ai'

export default defineEventHandler(async (event) => {
  const body = await readBody<AIRequestPayload>(event)

  if (!body?.messages || !body?.repoContext) {
    throw createError({ statusCode: 400, message: 'messages and repoContext are required' })
  }

  const config = useRuntimeConfig(event)
  const apiKey = config.cohereKey || ''

  console.log('[chat.post] cohereKey present:', !!apiKey, '| length:', apiKey.length)

  if (!apiKey) {
    throw createError({
      statusCode: 401,
      message: 'COHERE_API_KEY не найден. Добавь его в .env и перезапусти сервер.',
    })
  }

  const lastUserMessage = body.messages.at(-1)?.content ?? ''

  const systemPrompt = `You are an expert software engineer and code analyst. You have been given detailed information about a GitHub repository including its source code. Analyze it and answer questions concisely using markdown formatting.

Repository context:
${body.repoContext}

Answer based only on this data. If something is unclear, say so.`

  const response = await fetch('https://api.cohere.com/v2/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'X-Client-Name': 'github-ai-analyzer',
    },
    body: JSON.stringify({
      model: 'command-r-plus-08-2024',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: lastUserMessage },
      ],
      max_tokens: 1024,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('[chat.post] Cohere error:', response.status, errorText)
    throw createError({
      statusCode: response.status,
      message: `AI API error ${response.status}: ${errorText}`,
    })
  }

  const data = await response.json()
  const content = data.message?.content?.[0]?.text

  if (!content) {
    throw createError({ statusCode: 500, message: 'No response from AI model' })
  }

  return {
    content,
    model: 'command-r-plus',
    usage: null,
  }
})
