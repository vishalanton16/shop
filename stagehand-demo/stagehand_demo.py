import asyncio
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlsplit

from dotenv import load_dotenv
from gateway import generate
from stagehand import Stagehand, local_browser


async def main():
    browser = await local_browser.launch(headless=False)
    try:
        stagehand = await Stagehand.create(
            browser=browser, model=generate, self_heal=True
        )
        try:
            page = await browser.context.active_page()
            if page is None:
                raise RuntimeError("Chrome did not open a page.")
            await page.goto("http://localhost:3000")
            await asyncio.to_thread(
                input,
                "Ready to record. Press Enter to select Midnight Jack-o-Lantern. ",
            )
            print(
                f"{datetime.now(timezone.utc).isoformat()} | ACTION | Stagehand",
                flush=True,
            )
            response = await stagehand.act(
                'Click the product link named "Midnight Jack-o-Lantern" to open its product page.',
                page=page,
            )
            if response.data.success:
                await page.wait_for_function(
                    "location.pathname.startsWith('/products/')", timeout=5000
                )
            url = await page.url()
            passed = (
                response.data.success
                and urlsplit(url).path == "/products/midnight-jack-o-lantern"
            )
            print(
                f"{datetime.now(timezone.utc).isoformat()} | {'PASS' if passed else 'FAIL'} | {url}",
                flush=True,
            )
            await asyncio.to_thread(input, "Press Enter to close Chrome. ")
        finally:
            await stagehand.close()
    finally:
        await browser.close()


if __name__ == "__main__":
    load_dotenv(Path(__file__).with_name(".env"))
    asyncio.run(main())
