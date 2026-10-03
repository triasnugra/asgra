// ASGRA config. ID model sering berubah: tombol ↻ di samping dropdown model
// akan memuat daftar model terbaru langsung dari provider. Daftar di bawah = cadangan.
// type: "gemini" | "openai" (OpenAI-compatible) | "pplx" (Perplexity Agent API)
const CONFIG = {
  defaultSymbol: "BTCUSDT",
  stocks: ["NASDAQ:AAPL","NASDAQ:NVDA","NASDAQ:TSLA","NASDAQ:MSFT","NASDAQ:GOOGL","NASDAQ:AMZN","NASDAQ:META","NYSE:JPM",
           "IDX:BBCA","IDX:BBRI","IDX:BMRI","IDX:TLKM","IDX:ASII","IDX:GOTO","IDX:ANTM"],
  forex:  ["FX:EURUSD","FX:GBPUSD","FX:USDJPY","FX:USDIDR","FX:AUDUSD","FX:USDCAD","FX:USDCHF","OANDA:XAUUSD","OANDA:XAGUSD"],
  providers: {
    gemini: { label: "Gemini", type: "gemini", keyName: "gemini",
      url: "https://generativelanguage.googleapis.com/v1beta",
      note: "Gratis dengan limit harian.",
      models: [{ id: "gemini-3.8-flash", name: "Gemini 3.8 Flash" },
               { id: "gemini-3.5-flash-lite", name: "Gemini 3.5 Flash-Lite (kuota gratis lebih besar)" },
               { id: "gemini-3.7-flash", name: "Gemini 3.7 Flash" }] },
    groq: { label: "Groq", type: "openai", keyName: "groq",
      url: "https://api.groq.com/openai/v1",
      note: "GPT-OSS.",
      models: [{ id: "openai/gpt-oss-120b", name: "GPT-OSS 120B" },
               { id: "openai/gpt-oss-20b", name: "GPT-OSS 20B (lebih cepat)" }] },
    free: { label: "OpenRouter", type: "openai", keyName: "openrouter",
      url: "https://openrouter.ai/api/v1", filter: ":free$|^openrouter/free$",
      note: "Batas 20 request/menit dan 50 request/hari.",
      models: [{ id: "openrouter/free", name: "Free Router (otomatis pilih model gratis)" }] },
    chatgpt: { label: "ChatGPT", type: "openai", keyName: "openrouter",
      url: "https://openrouter.ai/api/v1", filter: "^openai/",
      note: "Berbayar: butuh saldo di OpenRouter (openrouter.ai/settings/credits).",
      models: [{ id: "openai/gpt-4o-mini", name: "GPT-4o mini" }, { id: "openai/gpt-4o", name: "GPT-4o" }] },
    claude: { label: "Claude", type: "openai", keyName: "openrouter",
      url: "https://openrouter.ai/api/v1", filter: "^anthropic/",
      note: "Berbayar: butuh saldo di OpenRouter. Tekan ↻ untuk daftar model Claude terbaru.",
      models: [{ id: "anthropic/claude-haiku-4.5", name: "Claude Haiku 4.5" }, { id: "anthropic/claude-sonnet-4.5", name: "Claude Sonnet 4.5" }] },
    perplexity: { label: "Perplexity", type: "pplx", keyName: "perplexity",
      url: "https://api.perplexity.ai",
      note: "Pakai Agent API (preset). Berita/web search real-time aktif di preset fast.",
      models: [{ id: "preset:fast", name: "Fast (pengganti Sonar, web search)" },
               { id: "preset:low", name: "Low (lebih teliti)" },
               { id: "preset:medium", name: "Medium" }] },
    grok: { label: "Grok", type: "openai", keyName: "grok",
      url: "https://api.x.ai/v1",
      note: "Butuh kredit di console.x.ai (cek paket kredit baru / program data sharing).",
      models: [{ id: "grok-4.3", name: "Grok 4.3" }] }
  },
  keys: [
    { name: "gemini", label: "Gemini", link: "https://aistudio.google.com/app/apikey" },
    { name: "groq", label: "Groq", link: "https://console.groq.com/keys" },
    { name: "openrouter", label: "OpenRouter (Gratis, ChatGPT, Claude)", link: "https://openrouter.ai/keys" },
    { name: "perplexity", label: "Perplexity", link: "https://www.perplexity.ai/settings/api" },
    { name: "grok", label: "Grok (xAI)", link: "https://console.x.ai/" },
    { name: "twelvedata", label: "Twelve Data (indikator saham & forex, opsional)", link: "https://twelvedata.com/account/api-keys" },
    { name: "coingecko", label: "CoinGecko Demo (opsional, limit lebih longgar)", link: "https://www.coingecko.com/en/developers/dashboard" }
  ]
};
