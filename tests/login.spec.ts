import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test("login with correct credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("aaaaaaaa");
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with to short username", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("test");
    await page.getByTestId("password-input").click();
    await page.getByTestId("error-login-id").click();

    await expect(page.getByTestId("error-login-id")).toHaveText(
      "identyfikator ma min. 8 znaków"
    );
  });

  test.only("unsuccessful login with to short password", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("aaaa");
    // await page.getByTestId("login-input").click(); below is another example that does the same thing, exits from the input
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText(
      "hasło ma min. 8 znaków"
    );
  });
});
