export type Locale = 'ru' | 'en'

export interface Translations {
  tagline: string
  searchPlaceholder: string
  tryLabel: string
  analyzeBtn: string
  errorRateLimit: string
  feature1Title: string
  feature1Desc: string
  feature2Title: string
  feature2Desc: string
  feature3Title: string
  feature3Desc: string
  fetching: string
  aiAnalysis: string
  q1: string
  q2: string
  q3: string
  q4: string
  chatPlaceholder: string
  greetingReady: string
  greetingAnalyzed: string
  greetingAskAbout: string
  greetingTopic1: string
  greetingTopic2: string
  greetingTopic3: string
  greetingTopic4: string
  greetingTopic5: string
  greetingTopic6: string
  sectionLanguages: string
  sectionTopics: string
  sectionCommits: string
  metaCreated: string
  metaLastPush: string
  metaRelease: string
  noDesc: string
  langSwitch: string
  // Compare mode
  compareMode: string
  singleMode: string
  compareTitle: string
  compareRepo1: string
  compareRepo2: string
  compareBtn: string
  compareFetching: string
  compareGreetingReady: string
  compareGreetingBody: string
  compareQ1: string
  compareQ2: string
  compareQ3: string
  compareQ4: string
  compareChatPlaceholder: string
  vs: string
}

export const translations: Record<Locale, Translations> = {
  ru: {
    tagline: 'ИИ-анализ GitHub репозиториев',
    searchPlaceholder: 'owner/repo  или  https://github.com/owner/repo',
    tryLabel: 'Попробуй:',
    analyzeBtn: 'Анализировать →',
    errorRateLimit: 'Добавь GITHUB_TOKEN в .env для увеличения лимита запросов.',
    feature1Title: 'Глубокий анализ',
    feature1Desc: 'Звёзды, форки, языки, контрибьюторы, коммиты, релизы — всё через GitHub API.',
    feature2Title: 'Бесплатный ИИ',
    feature2Desc: 'Работает на Cohere command-r-plus. Читает реальный исходный код репозитория.',
    feature3Title: 'Мгновенные ответы',
    feature3Desc: 'Спрашивай о качестве кода, стеке технологий, активности и рисках.',
    fetching: 'Загрузка',
    aiAnalysis: 'AI-анализ',
    q1: 'О чём этот проект?',
    q2: 'Насколько активна разработка?',
    q3: 'Какой стек технологий?',
    q4: 'Есть ли риски или проблемы?',
    chatPlaceholder: 'Задай вопрос о репозитории...',
    greetingReady: 'Анализ готов 🔍',
    greetingAnalyzed: 'Я изучил **{repo}** и готов отвечать на вопросы.',
    greetingAskAbout: 'Можешь спросить о:',
    greetingTopic1: '📊 Качестве кода и архитектуре',
    greetingTopic2: '🛠️ Стеке технологий и зависимостях',
    greetingTopic3: '👥 Сообществе и контрибьюторах',
    greetingTopic4: '🚀 Активности и истории релизов',
    greetingTopic5: '💡 Предложениях по улучшению',
    greetingTopic6: '🔍 Любом аспекте репозитория',
    sectionLanguages: 'Языки',
    sectionTopics: 'Темы',
    sectionCommits: 'Последние коммиты',
    metaCreated: 'Создан',
    metaLastPush: 'Последний push',
    metaRelease: 'Последний релиз',
    noDesc: 'Описание не указано',
    langSwitch: 'EN',
    // Compare
    compareMode: 'Сравнение',
    singleMode: 'Один репозиторий',
    compareTitle: 'Сравнить два репозитория',
    compareRepo1: 'Первый репозиторий',
    compareRepo2: 'Второй репозиторий',
    compareBtn: 'Сравнить →',
    compareFetching: 'Загружаю оба репозитория',
    compareGreetingReady: 'Сравнение готово ⚖️',
    compareGreetingBody: 'Я изучил **{repo1}** и **{repo2}**. Могу сравнить их по любому критерию.',
    compareQ1: 'Какой лучше поддерживается?',
    compareQ2: 'Сравни стек технологий',
    compareQ3: 'Плюсы и минусы каждого',
    compareQ4: 'Какой выбрать для продакшна?',
    compareChatPlaceholder: 'Спроси что-нибудь о сравнении...',
    vs: 'vs',
  },
  en: {
    tagline: 'AI-powered GitHub repository analysis',
    searchPlaceholder: 'owner/repo  or  https://github.com/owner/repo',
    tryLabel: 'Try:',
    analyzeBtn: 'Analyze →',
    errorRateLimit: 'Add GITHUB_TOKEN to your .env to increase rate limits.',
    feature1Title: 'Deep Analysis',
    feature1Desc: 'Stars, forks, languages, contributors, commits, releases — all via GitHub API.',
    feature2Title: 'Free AI Chat',
    feature2Desc: 'Powered by Cohere command-r-plus. Reads actual source code from the repo.',
    feature3Title: 'Instant Insights',
    feature3Desc: 'Ask about code quality, tech stack, activity, risks, and much more.',
    fetching: 'Fetching',
    aiAnalysis: 'AI Analysis',
    q1: 'What is this project about?',
    q2: 'How active is development?',
    q3: 'What is the tech stack?',
    q4: 'Any concerns or risks?',
    chatPlaceholder: 'Ask anything about this repository...',
    greetingReady: 'Analysis Ready 🔍',
    greetingAnalyzed: "I've analyzed **{repo}** and I'm ready to answer your questions.",
    greetingAskAbout: 'You can ask me about:',
    greetingTopic1: '📊 Code quality & architecture',
    greetingTopic2: '🛠️ Technology stack & dependencies',
    greetingTopic3: '👥 Community & contributors',
    greetingTopic4: '🚀 Activity & release history',
    greetingTopic5: '💡 Improvement suggestions',
    greetingTopic6: '🔍 Any specific aspect of the repo',
    sectionLanguages: 'Languages',
    sectionTopics: 'Topics',
    sectionCommits: 'Recent Commits',
    metaCreated: 'Created',
    metaLastPush: 'Last push',
    metaRelease: 'Latest release',
    noDesc: 'No description provided',
    langSwitch: 'RU',
    // Compare
    compareMode: 'Compare',
    singleMode: 'Single repo',
    compareTitle: 'Compare two repositories',
    compareRepo1: 'First repository',
    compareRepo2: 'Second repository',
    compareBtn: 'Compare →',
    compareFetching: 'Fetching both repositories',
    compareGreetingReady: 'Comparison Ready ⚖️',
    compareGreetingBody: "I've analyzed **{repo1}** and **{repo2}**. Ask me anything to compare them.",
    compareQ1: 'Which is better maintained?',
    compareQ2: 'Compare the tech stacks',
    compareQ3: 'Pros and cons of each',
    compareQ4: 'Which one for production?',
    compareChatPlaceholder: 'Ask anything about the comparison...',
    vs: 'vs',
  },
}
