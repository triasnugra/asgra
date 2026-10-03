const CONFIG = {
  providers: {
    gemini: { label: "Gemini", baseUrl: "https://generativelanguage.googleapis.com", models: [
      {id:"gemini-2.0-flash", name:"Gemini 2.0 Flash (1M token, free)"},
      {id:"gemini-1.5-pro", name:"Gemini 1.5 Pro (1M token)"}
    ]},
    groq: { label: "Meta Llama (via Groq)", baseUrl: "https://api.groq.com", models: [
      {id:"llama-3.3-70b-versatile", name:"Llama 3.3 70B (Meta, free)"},
      {id:"llama-3.1-8b-instant", name:"Llama 3.1 8B Fast"}
    ]},
    openai: { label: "ChatGPT", baseUrl: "https://api.openai.com/v1", models: [
      {id:"gpt-4o-mini", name:"GPT-4o Mini (murah/free via OpenRouter)"},
      {id:"gpt-4o", name:"GPT-4o"}
    ]},
    claude: { label: "Claude", baseUrl: "https://api.anthropic.com", models: [
      {id:"claude-3-5-sonnet-20241022", name:"Claude 3.5 Sonnet (200K)"},
      {id:"claude-3-haiku-20240307", name:"Claude 3 Haiku Fast"}
    ]},
    perplexity: { label: "Perplexity", baseUrl: "https://api.perplexity.ai", models: [
      {id:"llama-3.1-sonar-small-128k-online", name:"Sonar Small Online (news real-time)"},
      {id:"llama-3.1-sonar-large-128k-online", name:"Sonar Large Online"}
    ]},
    grok: { label: "Grok", baseUrl: "https://api.x.ai/v1", models: [
      {id:"grok-2-latest", name:"Grok 2 (sentimen X)"},
      {id:"grok-beta", name:"Grok Beta"}
    ]}
  }
};
