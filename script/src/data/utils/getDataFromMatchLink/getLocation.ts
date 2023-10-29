import { Page } from "puppeteer";

export const getLocation = async (page: Page) => {
  await Promise.race([
    page.waitForSelector(".sw-fixture-info-summary"),
    page.waitForSelector("span.location"),
  ]);

  return await page.evaluate(() => {
    // Location
    const locationElement = document.querySelector(
      ".sw-fixture-info-summary"
    ) as HTMLSpanElement;

    const locationSpan = document.querySelector("span.location");
    if (locationSpan) {
      return locationSpan.innerHTML.trim();
    }
    if (locationElement) {
      const location = locationElement.innerHTML
        .trim()
        .split(",")[1]
        .split(" - ")[1]
        .split("<span")[0];
      return location;
    }

    return null;
  });
};
