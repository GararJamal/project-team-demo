import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import UtilisateurComponentsPage, { UtilisateurDeleteDialog } from './utilisateur.page-object';
import UtilisateurUpdatePage from './utilisateur-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('Utilisateur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let utilisateurComponentsPage: UtilisateurComponentsPage;
  let utilisateurUpdatePage: UtilisateurUpdatePage;
  let utilisateurDeleteDialog: UtilisateurDeleteDialog;
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  it('should load Utilisateurs', async () => {
    await navBarPage.getEntityPage('utilisateur');
    utilisateurComponentsPage = new UtilisateurComponentsPage();
    expect(await utilisateurComponentsPage.title.getText()).to.match(/Utilisateurs/);

    expect(await utilisateurComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([utilisateurComponentsPage.noRecords, utilisateurComponentsPage.table]);

    beforeRecordsCount = (await isVisible(utilisateurComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(utilisateurComponentsPage.table);
  });

  it('should load create Utilisateur page', async () => {
    await utilisateurComponentsPage.createButton.click();
    utilisateurUpdatePage = new UtilisateurUpdatePage();
    expect(await utilisateurUpdatePage.getPageTitle().getAttribute('id')).to.match(/projectTeamDemoApp.utilisateur.home.createOrEditLabel/);
    await utilisateurUpdatePage.cancel();
  });

  it('should create and save Utilisateurs', async () => {
    await utilisateurComponentsPage.createButton.click();
    await utilisateurUpdatePage.setEMAILInput('eMAIL');
    expect(await utilisateurUpdatePage.getEMAILInput()).to.match(/eMAIL/);
    await utilisateurUpdatePage.setPHONENUMBERInput('pHONENUMBER');
    expect(await utilisateurUpdatePage.getPHONENUMBERInput()).to.match(/pHONENUMBER/);
    await utilisateurUpdatePage.setUSERNAMEInput('uSERNAME');
    expect(await utilisateurUpdatePage.getUSERNAMEInput()).to.match(/uSERNAME/);
    await utilisateurUpdatePage.setLASTSEENInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await utilisateurUpdatePage.getLASTSEENInput()).to.contain('2001-01-01T02:30');
    await utilisateurUpdatePage.setDEACTIVATIONDATEInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await utilisateurUpdatePage.getDEACTIVATIONDATEInput()).to.contain('2001-01-01T02:30');
    await utilisateurUpdatePage.setFIRSTNAMEInput('fIRSTNAME');
    expect(await utilisateurUpdatePage.getFIRSTNAMEInput()).to.match(/fIRSTNAME/);
    await utilisateurUpdatePage.setLASTNAMEInput('lASTNAME');
    expect(await utilisateurUpdatePage.getLASTNAMEInput()).to.match(/lASTNAME/);
    await utilisateurUpdatePage.setOCCUPATIONInput('oCCUPATION');
    expect(await utilisateurUpdatePage.getOCCUPATIONInput()).to.match(/oCCUPATION/);
    await utilisateurUpdatePage.setCITYInput('cITY');
    expect(await utilisateurUpdatePage.getCITYInput()).to.match(/cITY/);
    await utilisateurUpdatePage.setKINDInput('kIND');
    expect(await utilisateurUpdatePage.getKINDInput()).to.match(/kIND/);
    await utilisateurUpdatePage.setCREATEDBYInput('5');
    expect(await utilisateurUpdatePage.getCREATEDBYInput()).to.eq('5');
    await utilisateurUpdatePage.setCREATEDATInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await utilisateurUpdatePage.getCREATEDATInput()).to.contain('2001-01-01T02:30');
    await utilisateurUpdatePage.setUPDATEDBYInput('5');
    expect(await utilisateurUpdatePage.getUPDATEDBYInput()).to.eq('5');
    await utilisateurUpdatePage.setUPDATEDATInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await utilisateurUpdatePage.getUPDATEDATInput()).to.contain('2001-01-01T02:30');
    // utilisateurUpdatePage.haveSelectLastOption();
    await waitUntilDisplayed(utilisateurUpdatePage.saveButton);
    await utilisateurUpdatePage.save();
    await waitUntilHidden(utilisateurUpdatePage.saveButton);
    expect(await isVisible(utilisateurUpdatePage.saveButton)).to.be.false;

    expect(await utilisateurComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(utilisateurComponentsPage.table);

    await waitUntilCount(utilisateurComponentsPage.records, beforeRecordsCount + 1);
    expect(await utilisateurComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Utilisateur', async () => {
    const deleteButton = utilisateurComponentsPage.getDeleteButton(utilisateurComponentsPage.records.last());
    await click(deleteButton);

    utilisateurDeleteDialog = new UtilisateurDeleteDialog();
    await waitUntilDisplayed(utilisateurDeleteDialog.deleteModal);
    expect(await utilisateurDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/projectTeamDemoApp.utilisateur.delete.question/);
    await utilisateurDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(utilisateurDeleteDialog.deleteModal);

    expect(await isVisible(utilisateurDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([utilisateurComponentsPage.noRecords, utilisateurComponentsPage.table]);

    const afterCount = (await isVisible(utilisateurComponentsPage.noRecords)) ? 0 : await getRecordsCount(utilisateurComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
