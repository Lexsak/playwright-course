import { expect, test } from "@playwright/test";
import { loginData } from "../test-data/login.data";
import { LoginPage } from "../pages/login.page";
import { PulpitPage } from "../pages/pulpit.page";

test.describe("Group description", () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto("/");
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    pulpitPage = new PulpitPage(page);
  });

  test("quick payment with correct data", async ({ page }) => {
    // Arrange
    const receiverId = "2";
    const transferAmount = "150";
    const transferTitle = "pizza";
    const expectTransferReceiver = "Chuck Demobankowy";

    // Act

    await pulpitPage.transferReceiverSelect.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitleInput.fill(transferTitle);

    await pulpitPage.executeButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `Przelew wykonany! ${expectTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`
    );
  });

  test("successful mobile top-up", async ({ page }) => {
    // Arrange
    const topupReceiver = "500 xxx xxx";
    const topupAmount = "40";

    // Act

    await pulpitPage.topupReceiverInput.selectOption(topupReceiver);
    await pulpitPage.topupAmountInput.fill(topupAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();

    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.messageText).toHaveText(
      `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`
    );
  });

  test("correct balance after successful mobile top-up", async ({ page }) => {
    // Arrange

    const topupReceiver = "500 xxx xxx";
    const topupAmount = "40";
    const initialBalance = await pulpitPage.moneyValue.innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act

    await pulpitPage.topupReceiverInput.selectOption(topupReceiver);
    await pulpitPage.topupAmountInput.fill(topupAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();

    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
