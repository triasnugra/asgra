// ASGRA config. Ganti model di sini kalau ada yang sudah deprecated.
// type "gemini"  = API Google langsung
// type "openai"  = format OpenAI-compatible (Groq, OpenRouter, Perplexity, Grok)
const CONFIG = {
  defaultSymbol: "BTCUSDT",
  symbols: ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT"],
  providers: {
    gemini: { label: "Gemini", type: "gemini", keyName: "gemini",
      url: "https://generativelanguage.googleapis.com/v1beta",
      models: [
        { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (gratis)" },
        { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" }
      ] },
    llama: { label: "Meta Llama", type: "openai", keyName: "groq",
      url: "https://api.groq.com/openai/v1",
      models: [
        { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B (via Groq, gratis)" },
        { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B (cepat)" }
      ] },
    chatgpt: { label: "ChatGPT", type: "openai", keyName: "openrouter",
      url: "https://openrouter.ai/api/v1",
      models: [
        { id: "openai/gpt-4o-mini", name: "GPT-4o mini (via OpenRouter)" },
        { id: "openai/gpt-4o", name: "GPT-4o (via OpenRouter)" }
      ] },
    claude: { label: "Claude", type: "openai", keyName: "openrouter",
      url: "https://openrouter.ai/api/v1",
      models: [
        { id: "anthropic/claude-3.5-haiku", name: "Claude 3.5 Haiku (via OpenRouter)" },
        { id: "anthropic/claude-sonnet-4", name: "Claude Sonnet 4 (via OpenRouter)" }
      ] },
    perplexity: { label: "Perplexity", type: "openai", keyName: "perplexity",
      url: "https://api.perplexity.ai",
      models: [
        { id: "sonar", name: "Sonar (berita real-time)" },
        { id: "sonar-pro", name: "Sonar Pro" }
      ] },
    grok: { label: "Grok", type: "openai", keyName: "grok",
      url: "https://api.x.ai/v1",
      models: [
        { id: "grok-3-mini", name: "Grok 3 mini" },
        { id: "grok-3", name: "Grok 3" }
      ] }
  },
  // Kolom input API key (Claude & ChatGPT berbagi 1 key OpenRouter)
  keys: [
    { name: "gemini", label: "Gemini", link: "https://aistudio.google.com/app/apikey" },
    { name: "groq", label: "Groq (Llama)", link: "https://console.groq.com/keys" },
    { name: "openrouter", label: "OpenRouter (ChatGPT + Claude)", link: "https://openrouter.ai/keys" },
    { name: "perplexity", label: "Perplexity", link: "https://www.perplexity.ai/settings/api" },
    { name: "grok", label: "Grok (xAI)", link: "https://console.x.ai/" }
  ]
};
