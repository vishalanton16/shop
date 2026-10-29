import asyncio
from datetime import datetime, timezone
from urllib.parse import urlsplit

from playwright.async_api import async_playwright


async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(channel="chrome", headless=False)
        try:
            page = await browser.new_page(no_viewport=True)
            await page.goto("http://localhost:3000")
            cards = page.locator("[data-product-handle]")
            await cards.first.wait_for()
            index = await cards.evaluate_all(
                "nodes => nodes.findIndex(node => node.dataset.productHandle === 'midnight-jack-o-lantern')"
            )
            if index < 0:
                raise RuntimeError(
                    "Midnight Jack-o-Lantern is missing from the catalog."
                )

            await asyncio.to_thread(
                input,
                "Ready to record. Press Enter to click the recorded product position. ",
            )
            await page.wait_for_function(
                "index => document.querySelectorAll('[data-product-handle]')[index].dataset.productHandle !== 'midnight-jack-o-lantern'",
                arg=index,
            )
            print(
                f"{datetime.now(timezone.utc).isoformat()} | ACTION | Playwright",
                flush=True,
            )
            await cards.nth(index).locator("h3 a").click(timeout=5000)
            await page.wait_for_function("location.pathname.startsWith('/products/')")
            url = await page.evaluate("location.href")
            passed = urlsplit(url).path == "/products/midnight-jack-o-lantern"
            print(
                f"{datetime.now(timezone.utc).isoformat()} | {'PASS' if passed else 'FAIL'} | {url}",
                flush=True,
            )
            await asyncio.to_thread(input, "Press Enter to close Chrome. ")
        finally:
            await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
