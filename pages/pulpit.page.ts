import { Page } from "@playwright/test";
import { SideMenuComponent } from "../components/side-menu.component";

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiverSelect = this.page.locator("#widget_1_transfer_receiver");
  transferAmountInput = this.page.locator("#widget_1_transfer_amount");
  transferTitleInput = this.page.locator("#widget_1_transfer_title");

  executeButton = this.page.locator("#execute_btn");
  closeButton = this.page.getByTestId("close-button");

  messageText = this.page.locator("#show_messages");

  topupReceiverInput = this.page.locator("#widget_1_topup_receiver");
  topupAmountInput = this.page.locator("#widget_1_topup_amount");
  topupAgreementCheckbox = this.page.locator(
    "#uniform-widget_1_topup_agreement span"
  );
  topupExecuteButton = this.page.getByRole("button", {
    name: "doładuj telefon",
  });
  moneyValue = this.page.locator("#money_value");

  userNameText = this.page.getByTestId("user-name");

  async quickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string
  ): Promise<void> {
    await this.transferReceiverSelect.selectOption(receiverId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);

    await this.executeButton.click();
    await this.closeButton.click();
  }

  async mobileTopUp(topupReceiver: string, topupAmount: string): Promise<void> {
    await this.topupReceiverInput.selectOption(topupReceiver);
    await this.topupAmountInput.fill(topupAmount);
    await this.topupAgreementCheckbox.click();
    await this.topupExecuteButton.click();

    await this.closeButton.click();
  }
}
