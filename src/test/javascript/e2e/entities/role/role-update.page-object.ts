import { element, by, ElementFinder } from 'protractor';

export default class RoleUpdatePage {
  pageTitle: ElementFinder = element(by.id('projectTeamDemoApp.role.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nAMEInput: ElementFinder = element(by.css('input#role-nAME'));
  cODEInput: ElementFinder = element(by.css('input#role-cODE'));
  dESCRIPTIONInput: ElementFinder = element(by.css('input#role-dESCRIPTION'));
  cREATEDBYInput: ElementFinder = element(by.css('input#role-cREATEDBY'));
  cREATEDATInput: ElementFinder = element(by.css('input#role-cREATEDAT'));
  uPDATEDBYInput: ElementFinder = element(by.css('input#role-uPDATEDBY'));
  uPDATEDATInput: ElementFinder = element(by.css('input#role-uPDATEDAT'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNAMEInput(nAME) {
    await this.nAMEInput.sendKeys(nAME);
  }

  async getNAMEInput() {
    return this.nAMEInput.getAttribute('value');
  }

  async setCODEInput(cODE) {
    await this.cODEInput.sendKeys(cODE);
  }

  async getCODEInput() {
    return this.cODEInput.getAttribute('value');
  }

  async setDESCRIPTIONInput(dESCRIPTION) {
    await this.dESCRIPTIONInput.sendKeys(dESCRIPTION);
  }

  async getDESCRIPTIONInput() {
    return this.dESCRIPTIONInput.getAttribute('value');
  }

  async setCREATEDBYInput(cREATEDBY) {
    await this.cREATEDBYInput.sendKeys(cREATEDBY);
  }

  async getCREATEDBYInput() {
    return this.cREATEDBYInput.getAttribute('value');
  }

  async setCREATEDATInput(cREATEDAT) {
    await this.cREATEDATInput.sendKeys(cREATEDAT);
  }

  async getCREATEDATInput() {
    return this.cREATEDATInput.getAttribute('value');
  }

  async setUPDATEDBYInput(uPDATEDBY) {
    await this.uPDATEDBYInput.sendKeys(uPDATEDBY);
  }

  async getUPDATEDBYInput() {
    return this.uPDATEDBYInput.getAttribute('value');
  }

  async setUPDATEDATInput(uPDATEDAT) {
    await this.uPDATEDATInput.sendKeys(uPDATEDAT);
  }

  async getUPDATEDATInput() {
    return this.uPDATEDATInput.getAttribute('value');
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
