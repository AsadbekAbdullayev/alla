import { test, expect } from "@playwright/test";

test("Performance test for homepage", async ({ page }) => {
  // 1️⃣ Vaqtni boshlaymiz
  const start = Date.now();

  // 2️⃣ Sahifani ochamiz
  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle",
  });

  // 3️⃣ Asosiy element (masalan header) chiqquncha kutamiz
  await page.waitForSelector("div", { timeout: 5000 });

  // 4️⃣ Endi vaqtni to‘xtatamiz
  const end = Date.now();

  // 5️⃣ Yuklanish vaqtini hisoblaymiz
  const loadTime = end - start;

  // 6️⃣ Konsolda natijani ko‘rsatamiz
  console.log(`⏱️ Page load time: ${loadTime} ms`);

  // 7️⃣ Agar 3 soniyadan oshsa — test xato deydi
  expect(loadTime).toBeLessThan(3000);
});
