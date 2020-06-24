import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import RoleComponentsPage, { RoleDeleteDialog } from './role.page-object';
import RoleUpdatePage from './role-update.page-object';
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

describe('Role e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let roleComponentsPage: RoleComponentsPage;
  let roleUpdatePage: RoleUpdatePage;
  let roleDeleteDialog: RoleDeleteDialog;
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

  it('should load Roles', async () => {
    await navBarPage.getEntityPage('role');
    roleComponentsPage = new RoleComponentsPage();
    expect(await roleComponentsPage.title.getText()).to.match(/Roles/);

    expect(await roleComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([roleComponentsPage.noRecords, roleComponentsPage.table]);

    beforeRecordsCount = (await isVisible(roleComponentsPage.noRecords)) ? 0 : await getRecordsCount(roleComponentsPage.table);
  });

  it('should load create Role page', async () => {
    await roleComponentsPage.createButton.click();
    roleUpdatePage = new RoleUpdatePage();
    expect(await roleUpdatePage.getPageTitle().getAttribute('id')).to.match(/projectTeamDemoApp.role.home.createOrEditLabel/);
    await roleUpdatePage.cancel();
  });

  it('should create and save Roles', async () => {
    await roleComponentsPage.createButton.click();
    await roleUpdatePage.setNAMEInput('nAME');
    expect(await roleUpdatePage.getNAMEInput()).to.match(/nAME/);
    await roleUpdatePage.setCODEInput('cODE');
    expect(await roleUpdatePage.getCODEInput()).to.match(/cODE/);
    await roleUpdatePage.setDESCRIPTIONInput('dESCRIPTION');
    expect(await roleUpdatePage.getDESCRIPTIONInput()).to.match(/dESCRIPTION/);
    await roleUpdatePage.setCREATEDBYInput('5');
    expect(await roleUpdatePage.getCREATEDBYInput()).to.eq('5');
    await roleUpdatePage.setCREATEDATInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await roleUpdatePage.getCREATEDATInput()).to.contain('2001-01-01T02:30');
    await roleUpdatePage.setUPDATEDBYInput('5');
    expect(await roleUpdatePage.getUPDATEDBYInput()).to.eq('5');
    await roleUpdatePage.setUPDATEDATInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
    expect(await roleUpdatePage.getUPDATEDATInput()).to.contain('2001-01-01T02:30');
    await waitUntilDisplayed(roleUpdatePage.saveButton);
    await roleUpdatePage.save();
    await waitUntilHidden(roleUpdatePage.saveButton);
    expect(await isVisible(roleUpdatePage.saveButton)).to.be.false;

    expect(await roleComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(roleComponentsPage.table);

    await waitUntilCount(roleComponentsPage.records, beforeRecordsCount + 1);
    expect(await roleComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Role', async () => {
    const deleteButton = roleComponentsPage.getDeleteButton(roleComponentsPage.records.last());
    await click(deleteButton);

    roleDeleteDialog = new RoleDeleteDialog();
    await waitUntilDisplayed(roleDeleteDialog.deleteModal);
    expect(await roleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/projectTeamDemoApp.role.delete.question/);
    await roleDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(roleDeleteDialog.deleteModal);

    expect(await isVisible(roleDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([roleComponentsPage.noRecords, roleComponentsPage.table]);

    const afterCount = (await isVisible(roleComponentsPage.noRecords)) ? 0 : await getRecordsCount(roleComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
