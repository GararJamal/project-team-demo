import { element, by, ElementFinder } from 'protractor';

export default class CarUpdatePage {
  pageTitle: ElementFinder = element(by.id('projectTeamDemoApp.car.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  driverSelect: ElementFinder = element(by.css('select#car-driver'));

  getPageTitle() {
    return this.pageTitle;
  }

  async driverSelectLastOption() {
    await this.driverSelect.all(by.tagName('option')).last().click();
  }

  async driverSelectOption(option) {
    await this.driverSelect.sendKeys(option);
  }

  getDriverSelect() {
    return this.driverSelect;
  }

  async getDriverSelectedOption() {
    return this.driverSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
