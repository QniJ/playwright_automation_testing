// @ts-check
import { test, expect } from "@playwright/test";
import { describe } from "node:test";

test.describe("Invalid Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.automationexercise.com/login");
  });
  test("Invalid username", async ({ page }) => {
    const emailinput = page.locator('[data-qa="login-email"]');
    await emailinput.fill("");
    await page.fill('input[name="password"]', "validPassword");
    const button = page.getByRole("button", { name: "Login" });
    await button.click();
    await expect(emailinput).toHaveJSProperty(
      "validationMessage",
      "Please fill out this field."
    );
  });
  test("Invalid password", async ({ page }) => {
    const emailinput = page.locator('[data-qa="login-email"]');
    await emailinput.fill("test@email.com");
    const emailpassword = page.locator('[data-qa="login-password"]');
    await emailpassword.fill("");
    const button = page.getByRole("button", { name: "Login" });
    await button.click();
    await expect(page.locator('[data-qa="login-password"]')).toHaveJSProperty(
      "validationMessage",
      "Please fill out this field."
    );
  });
  test("Invalid credentials", async ({ page }) => {
    const emailinput = page.locator('[data-qa="login-email"]');
    await emailinput.fill("test@email.com");
    const emailpassword = page.locator('[data-qa="login-password"]');
    await emailpassword.fill("invalidPassword");
    const button = page.getByRole("button", { name: "Login" });
    await button.click();
    await expect(
      page.getByText("Your email or password is incorrect!")
    ).toBeVisible();
  });
});
