import { test, expect } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PaymentPage } from "../pages/payment.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Payment tests", () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto("/");
    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();

    paymentPage = new PaymentPage(page);
  });

  test("simple payment", async ({ page }) => {
    // Arrange
    const transferReceiver = "Jan Nowak";
    const transferAccount = "12 4971 2653 1290 5736 2805 32605";
    const transferAmount = "222";
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferAccountInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);

    await paymentPage.transferButton.click();
    await paymentPage.closeButton.click();

    // Assert
    await expect(paymentPage.messageText).toHaveText(expectedMessage);
  });
});
