# Recording demos

Keep the storefront running with `pnpm dev`. Each script opens its own local Chrome window with the browser's default size. Products keep juggling at Lively speed.

```sh
cd stagehand-demo
uv venv
uv pip install -r requirements.txt
```

Record each run separately:

```sh
.venv/bin/python playwright_demo.py
.venv/bin/python stagehand_demo.py
```

Press Enter when recording is ready. The script prints UTC timestamps for the action and result so you can align the videos. Press Enter again to close Chrome.

Playwright reuses the product's recorded card position after the product moves. Stagehand makes one natural-language `act` call through AI Gateway using `openai/gpt-6-luna`. The Stagehand script loads `AI_GATEWAY_API_KEY` from the ignored `.env` beside it. Chrome must be installed.

This compares a positional selector with product intent. A Playwright locator by product name can survive reordering too. Stagehand can also click the wrong product if its inferred XPath becomes stale; both scripts check the actual destination. A fresh natural-language `act` call does not by itself prove a self-healing retry occurred.
