import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DriverComponentsPage, { DriverDeleteDialog } from './driver.page-object';
import DriverUpdatePage from './driver-update.page-object';
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

describe('Driver e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let driverComponentsPage: DriverComponentsPage;
  let driverUpdatePage: DriverUpdatePage;
  let driverDeleteDialog: DriverDeleteDialog;
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

  it('should load Drivers', async () => {
    await navBarPage.getEntityPage('driver');
    driverComponentsPage = new DriverComponentsPage();
    expect(await driverComponentsPage.title.getText()).to.match(/Drivers/);

    expect(await driverComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([driverComponentsPage.noRecords, driverComponentsPage.table]);

    beforeRecordsCount = (await isVisible(driverComponentsPage.noRecords)) ? 0 : await getRecordsCount(driverComponentsPage.table);
  });

  it('should load create Driver page', async () => {
    await driverComponentsPage.createButton.click();
    driverUpdatePage = new DriverUpdatePage();
    expect(await driverUpdatePage.getPageTitle().getAttribute('id')).to.match(/projectTeamDemoApp.driver.home.createOrEditLabel/);
    await driverUpdatePage.cancel();
  });

  it('should create and save Drivers', async () => {
    await driverComponentsPage.createButton.click();
    await waitUntilDisplayed(driverUpdatePage.saveButton);
    await driverUpdatePage.save();
    await waitUntilHidden(driverUpdatePage.saveButton);
    expect(await isVisible(driverUpdatePage.saveButton)).to.be.false;

    expect(await driverComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(driverComponentsPage.table);

    await waitUntilCount(driverComponentsPage.records, beforeRecordsCount + 1);
    expect(await driverComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Driver', async () => {
    const deleteButton = driverComponentsPage.getDeleteButton(driverComponentsPage.records.last());
    await click(deleteButton);

    driverDeleteDialog = new DriverDeleteDialog();
    await waitUntilDisplayed(driverDeleteDialog.deleteModal);
    expect(await driverDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/projectTeamDemoApp.driver.delete.question/);
    await driverDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(driverDeleteDialog.deleteModal);

    expect(await isVisible(driverDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([driverComponentsPage.noRecords, driverComponentsPage.table]);

    const afterCount = (await isVisible(driverComponentsPage.noRecords)) ? 0 : await getRecordsCount(driverComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
