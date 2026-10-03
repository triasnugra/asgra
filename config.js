// ASGRA config. Ganti model / daftar simbol di sini.
// type "gemini" = API Google langsung | "openai" = format OpenAI-compatible
const CONFIG = {
  defaultSymbol: "BTCUSDT",
  // Saran di kolom pencarian (kamu tetap bisa ketik simbol apa pun, format BURSA:TICKER)
  stocks: ["NASDAQ:AAPL","NASDAQ:NVDA","NASDAQ:TSLA","NASDAQ:MSFT","NASDAQ:GOOGL","NASDAQ:AMZN","NASDAQ:META","NYSE:JPM",
           "IDX:BBCA","IDX:BBRI","IDX:BMRI","IDX:TLKM","IDX:ASII","IDX:GOTO","IDX:ANTM"],
  forex:  ["FX:EURUSD","FX:GBPUSD","FX:USDJPY","FX:USDIDR","FX:AUDUSD","FX:USDCAD","FX:USDCHF",
           "OANDA:XAUUSD","OANDA:XAGUSD"],
  providers: {
    gemini: { label: "Gemini", type: "gemini", keyName: "gemini",
      url: "https://generativelanguage.googleapis.com/v1beta",
      models: [{ id: "gemini-2.5-flash", name: "Gemini 2.5 Flash (gratis)" },
               { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash" }] },
    llama: { label: "Meta Llama", type: "openai", keyName: "groq",
      url: "https://api.groq.com/openai/v1",
      models: [{ id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B (via Groq, gratis)" },
               { id: "llama-3.1-8b-instant", name: "Llama 3.1 8B (cepat)" }] },
    chatgpt: { label: "ChatGPT", type: "openai", keyName: "openrouter",
      url: "https://openrouter.ai/api/v1",
      models: [{ id: "openai/gpt-4o-mini", name: "GPT-4o mini (via OpenRouter)" },
               { id: "openai/gpt-4o", name: "GPT-4o (via OpenRouter)" }] },
    claude: { label: "Claude", type: "openai", keyName: "openrouter",
      url: "https://openrouter.ai/api/v1",
      models: [{ id: "anthropic/claude-3.5-haiku", name: "Claude 3.5 Haiku (via OpenRouter)" },
               { id: "anthropic/claude-sonnet-4", name: "Claude Sonnet 4 (via OpenRouter)" }] },
    perplexity: { label: "Perplexity", type: "openai", keyName: "perplexity",
      url: "https://api.perplexity.ai",
      models: [{ id: "sonar", name: "Sonar (berita real-time)" },
               { id: "sonar-pro", name: "Sonar Pro" }] },
    grok: { label: "Grok", type: "openai", keyName: "grok",
      url: "https://api.x.ai/v1",
      models: [{ id: "grok-3-mini", name: "Grok 3 mini" },
               { id: "grok-3", name: "Grok 3" }] }
  },
  keys: [
    { name: "gemini", label: "Gemini", link: "https://aistudio.google.com/app/apikey" },
    { name: "groq", label: "Groq (Llama)", link: "https://console.groq.com/keys" },
    { name: "openrouter", label: "OpenRouter (ChatGPT + Claude)", link: "https://openrouter.ai/keys" },
    { name: "perplexity", label: "Perplexity", link: "https://www.perplexity.ai/settings/api" },
    { name: "grok", label: "Grok (xAI)", link: "https://console.x.ai/" },
    { name: "twelvedata", label: "Twelve Data (indikator saham & forex, opsional)", link: "https://twelvedata.com/account/api-keys" },
    { name: "coingecko", label: "CoinGecko Demo (opsional, limit lebih longgar)", link: "https://www.coingecko.com/en/developers/dashboard" }
  ]
};
