import { expect, test } from "@playwright/test";
import { loginData } from "../test-data/login.data";

test.describe("Group description", () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const url = "https://demo-bank.vercel.app/";
    await page.goto(url);

    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const receiverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectTransferReceiver = "Chuck Demobankowy";

    // Act
    await page.locator("#widget_1_transfer_receiver").selectOption(receiverId);
    await page.locator("#widget_1_transfer_amount").fill(transferAmount);
    await page.locator("#widget_1_transfer_title").fill(transferTitle);

    await page.locator("#execute_btn").click();
    await page.getByTestId("close-button").click();
    // await page.getByRole("link", {
    //   name: "Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza",
    // }).click();

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Przelew wykonany! ${expectTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    // Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "40";

    // Act
    await page.locator("#widget_1_topup_receiver").selectOption(topupReceiver);
    await page.locator("#widget_1_topup_amount").fill(topupAmount);
    await page.locator("#uniform-widget_1_topup_agreement span").click();
    await page.getByRole("button", { name: "doładuj telefon" }).click();
    await page.getByTestId("close-button").click();
    // await page.getByRole("link", {
    //   name: "Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx",
    // });

    // Assert
    await expect(page.locator("#show_messages")).toHaveText(
      `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`
    );
  })

   test("correct balance after successful mobile top-up", async ({ page }) => {
     // Arrange
     const topupReceiver = "500 xxx xxx";
     const topupAmount = "40";
     const initialBalance = await page.locator("#money_value").innerText();
     const expectedBalance = Number(initialBalance) - Number(topupAmount);

     // Act
     await page.locator("#widget_1_topup_receiver").selectOption(topupReceiver);
     await page.locator("#widget_1_topup_amount").fill(topupAmount);
     await page.locator("#uniform-widget_1_topup_agreement span").click();
     await page.getByRole("button", { name: "doładuj telefon" }).click();
     await page.getByTestId("close-button").click();
     // await page.getByRole("link", {
     //   name: "Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx",
     // });

     // Assert
     await expect(page.locator("#money_value")).toHaveText(`${expectedBalance}`);
   });
});
