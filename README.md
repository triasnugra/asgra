# ASGRA
Analisa crypto dengan 6 AI (Gemini, Llama, ChatGPT, Claude, Perplexity, Grok), chart TradingView, RSI/MACD/VWAP dari data Binance, Fear & Greed, dan top movers.
Bukan saran finansial. Jangan pernah commit API key ke repo; key diisi lewat halaman web dan disimpan di browser.

## Data saham & forex
- Crypto: Binance (langsung dari browser).
- Saham/forex/emas: Yahoo Finance, diambil oleh GitHub Actions (`scripts/fetch-market.mjs`) tiap 30 menit di hari kerja, lalu disimpan di `data/`. Data tertunda, bukan real-time.
- Simbol yang didukung = daftar `stocks` dan `forex` di `config.js`. Tambah simbol di sana, commit, lalu jalankan workflow (Actions → Deploy → Run workflow).
- Key Twelve Data bersifat opsional (saham AS/forex lebih segar); saham IDX tidak tercakup paket gratisnya.
