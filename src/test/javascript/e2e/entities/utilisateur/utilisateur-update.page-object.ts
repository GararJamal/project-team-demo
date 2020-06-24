import { element, by, ElementFinder } from 'protractor';

export default class UtilisateurUpdatePage {
  pageTitle: ElementFinder = element(by.id('projectTeamDemoApp.utilisateur.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  eMAILInput: ElementFinder = element(by.css('input#utilisateur-eMAIL'));
  pHONENUMBERInput: ElementFinder = element(by.css('input#utilisateur-pHONENUMBER'));
  uSERNAMEInput: ElementFinder = element(by.css('input#utilisateur-uSERNAME'));
  lASTSEENInput: ElementFinder = element(by.css('input#utilisateur-lASTSEEN'));
  dEACTIVATIONDATEInput: ElementFinder = element(by.css('input#utilisateur-dEACTIVATIONDATE'));
  fIRSTNAMEInput: ElementFinder = element(by.css('input#utilisateur-fIRSTNAME'));
  lASTNAMEInput: ElementFinder = element(by.css('input#utilisateur-lASTNAME'));
  oCCUPATIONInput: ElementFinder = element(by.css('input#utilisateur-oCCUPATION'));
  cITYInput: ElementFinder = element(by.css('input#utilisateur-cITY'));
  kINDInput: ElementFinder = element(by.css('input#utilisateur-kIND'));
  cREATEDBYInput: ElementFinder = element(by.css('input#utilisateur-cREATEDBY'));
  cREATEDATInput: ElementFinder = element(by.css('input#utilisateur-cREATEDAT'));
  uPDATEDBYInput: ElementFinder = element(by.css('input#utilisateur-uPDATEDBY'));
  uPDATEDATInput: ElementFinder = element(by.css('input#utilisateur-uPDATEDAT'));
  haveSelect: ElementFinder = element(by.css('select#utilisateur-have'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEMAILInput(eMAIL) {
    await this.eMAILInput.sendKeys(eMAIL);
  }

  async getEMAILInput() {
    return this.eMAILInput.getAttribute('value');
  }

  async setPHONENUMBERInput(pHONENUMBER) {
    await this.pHONENUMBERInput.sendKeys(pHONENUMBER);
  }

  async getPHONENUMBERInput() {
    return this.pHONENUMBERInput.getAttribute('value');
  }

  async setUSERNAMEInput(uSERNAME) {
    await this.uSERNAMEInput.sendKeys(uSERNAME);
  }

  async getUSERNAMEInput() {
    return this.uSERNAMEInput.getAttribute('value');
  }

  async setLASTSEENInput(lASTSEEN) {
    await this.lASTSEENInput.sendKeys(lASTSEEN);
  }

  async getLASTSEENInput() {
    return this.lASTSEENInput.getAttribute('value');
  }

  async setDEACTIVATIONDATEInput(dEACTIVATIONDATE) {
    await this.dEACTIVATIONDATEInput.sendKeys(dEACTIVATIONDATE);
  }

  async getDEACTIVATIONDATEInput() {
    return this.dEACTIVATIONDATEInput.getAttribute('value');
  }

  async setFIRSTNAMEInput(fIRSTNAME) {
    await this.fIRSTNAMEInput.sendKeys(fIRSTNAME);
  }

  async getFIRSTNAMEInput() {
    return this.fIRSTNAMEInput.getAttribute('value');
  }

  async setLASTNAMEInput(lASTNAME) {
    await this.lASTNAMEInput.sendKeys(lASTNAME);
  }

  async getLASTNAMEInput() {
    return this.lASTNAMEInput.getAttribute('value');
  }

  async setOCCUPATIONInput(oCCUPATION) {
    await this.oCCUPATIONInput.sendKeys(oCCUPATION);
  }

  async getOCCUPATIONInput() {
    return this.oCCUPATIONInput.getAttribute('value');
  }

  async setCITYInput(cITY) {
    await this.cITYInput.sendKeys(cITY);
  }

  async getCITYInput() {
    return this.cITYInput.getAttribute('value');
  }

  async setKINDInput(kIND) {
    await this.kINDInput.sendKeys(kIND);
  }

  async getKINDInput() {
    return this.kINDInput.getAttribute('value');
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

  async haveSelectLastOption() {
    await this.haveSelect.all(by.tagName('option')).last().click();
  }

  async haveSelectOption(option) {
    await this.haveSelect.sendKeys(option);
  }

  getHaveSelect() {
    return this.haveSelect;
  }

  async getHaveSelectedOption() {
    return this.haveSelect.element(by.css('option:checked')).getText();
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
