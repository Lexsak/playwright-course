import { expect, test } from "@playwright/test";

test.describe("Group description", () => {
  test("quick payment with correct data", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").fill("aaaaaaaa");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("150");
    await page.locator("#widget_1_transfer_title").fill("pizza");

    // await page.getByRole("button", { name: "wykonaj" }).click();
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();
    // await page.getByRole("link", {
    //   name: "Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza",
    // }).click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza"
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").fill("aaaaaaaa");
    await page.getByTestId("login-button").click();

    await page.locator("#widget_1_topup_receiver").selectOption("500 xxx xxx");
    await page.locator("#widget_1_topup_amount").fill("40");
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();
    // await page.getByRole("link", {
    //   name: "Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx",
    // });

    await expect(page.locator("#show_messages")).toHaveText(
      "Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx"
    );
  });
});
