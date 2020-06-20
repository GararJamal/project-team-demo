import { element, by, ElementFinder } from 'protractor';

export default class CountryUpdatePage {
  pageTitle: ElementFinder = element(by.id('projectTeamDemoApp.country.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomInput: ElementFinder = element(by.css('input#country-nom'));
  codeInput: ElementFinder = element(by.css('input#country-code'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
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
