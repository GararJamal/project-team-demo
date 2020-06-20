import { element, by, ElementFinder } from 'protractor';

export default class CityUpdatePage {
  pageTitle: ElementFinder = element(by.id('projectTeamDemoApp.city.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomInput: ElementFinder = element(by.css('input#city-nom'));
  codeInput: ElementFinder = element(by.css('input#city-code'));
  inSelect: ElementFinder = element(by.css('select#city-in'));

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

  async inSelectLastOption() {
    await this.inSelect.all(by.tagName('option')).last().click();
  }

  async inSelectOption(option) {
    await this.inSelect.sendKeys(option);
  }

  getInSelect() {
    return this.inSelect;
  }

  async getInSelectedOption() {
    return this.inSelect.element(by.css('option:checked')).getText();
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
