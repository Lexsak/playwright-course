import { expect, test } from "@playwright/test";

test.describe("Group description", () => {
  test("tewsf", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").fill("aaaaaaaa");
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await page.locator("#widget_1_transfer_receiver").selectOption("2");
    await page.locator("#widget_1_transfer_amount").fill("200,99");
    await page.locator("#widget_1_transfer_title").fill("zwrot środków");

    // await page.getByRole("button", { name: "wykonaj" }).click();
    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();
    // await page.getByRole("link", {
    //   name: "Przelew wykonany! Chuck Demobankowy - 200,99,00PLN - zwrot środków",
    // }).click();

    await expect(page.locator("#show_messages")).toHaveText(
      "Przelew wykonany! Chuck Demobankowy - 200,99,00PLN - zwrot środków"
    );
  });
});
