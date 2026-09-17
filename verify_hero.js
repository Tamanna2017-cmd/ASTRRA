import puppeteer from "puppeteer";

async function capture() {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log("Navigating to http://localhost:5175 ...");
  await page.goto("http://localhost:5175", { waitUntil: "domcontentloaded" });

  console.log("Waiting 3.5s for preloader curtain to finish...");
  await new Promise((r) => setTimeout(r, 3500));

  const bounds = await page.evaluate(() => {
    const el = document.querySelector(".hero");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  });

  console.log("Hero Position:", bounds);

  const screenshotPath = "C:/Users/taman/.gemini/antigravity/brain/6ae10a05-99b1-4679-bff1-db48842e05c3/hero_verified_final.png";
  await page.screenshot({ path: screenshotPath });
  console.log("Screenshot saved to:", screenshotPath);

  await browser.close();
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
