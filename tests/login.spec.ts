import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test.beforeEach(async ({ page }) => {
    const url = "https://demo-bank.vercel.app/";
    await page.goto(url);
  });

  test("login with correct credentials", async ({ page }) => {
    // Arrange
    const userId = "tester12";
    const userPassword = "aaaaaaaa";
    const expectedUserName = "Jan Demobankowy";

    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(userPassword);
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    // Assert
    await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
  });

  test("unsuccessful login with too short username", async ({ page }) => {
    // Arrange
    const incorrectUserId = "tester";

    const expectedErrorMessage = "identyfikator ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(incorrectUserId);
    await page.getByTestId("password-input").click();
    await page.getByTestId("error-login-id").click();

    // Assert
    await expect(page.getByTestId("error-login-id")).toHaveText(
      expectedErrorMessage
    );
  });

  test("unsuccessful login with too short password", async ({ page }) => {
    // Arrange
    const userId = "tester12";
    const incorrectPassword = "aaaa";

    const expectedErrorMessage = "hasło ma min. 8 znaków";

    // Act
    await page.getByTestId("login-input").fill(userId);
    await page.getByTestId("password-input").fill(incorrectPassword);
    // await page.getByTestId("login-input").click(); below is another example that does the same thing, exits from the input
    await page.getByTestId("password-input").blur();

    // Assert
    await expect(page.getByTestId("error-login-password")).toHaveText(
      expectedErrorMessage
    );
  });
});
