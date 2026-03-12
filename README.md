# GitHub AI Analyzer
Доступно по ссылке https://repository-analyzer-phi.vercel.app/compare
Nuxt 4 + TypeScript приложение для анализа GitHub репозиториев с помощью бесплатного ИИ (Cohere).

## Быстрый старт

```bash
npm install
npm run dev
```

## Необходимо добавить env файл

 `COHERE_API_KEY` [dashboard.cohere.com]

 `GITHUB_TOKEN` повышает лимит с 60 до 5000 запросов

## Стек

- **Nuxt 4** + **TypeScript** (strict)
- **Tailwind CSS** — базовые утилиты
- **GitHub REST API** — метаданные + исходный код репо
- **Cohere** — бесплатный AI (1000 req/month)
