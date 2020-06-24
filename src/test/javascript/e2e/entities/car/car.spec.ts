import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CarComponentsPage, { CarDeleteDialog } from './car.page-object';
import CarUpdatePage from './car-update.page-object';
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

describe('Car e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let carComponentsPage: CarComponentsPage;
  let carUpdatePage: CarUpdatePage;
  let carDeleteDialog: CarDeleteDialog;
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

  it('should load Cars', async () => {
    await navBarPage.getEntityPage('car');
    carComponentsPage = new CarComponentsPage();
    expect(await carComponentsPage.title.getText()).to.match(/Cars/);

    expect(await carComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilAnyDisplayed([carComponentsPage.noRecords, carComponentsPage.table]);

    beforeRecordsCount = (await isVisible(carComponentsPage.noRecords)) ? 0 : await getRecordsCount(carComponentsPage.table);
  });

  it('should load create Car page', async () => {
    await carComponentsPage.createButton.click();
    carUpdatePage = new CarUpdatePage();
    expect(await carUpdatePage.getPageTitle().getAttribute('id')).to.match(/projectTeamDemoApp.car.home.createOrEditLabel/);
    await carUpdatePage.cancel();
  });

  it('should create and save Cars', async () => {
    await carComponentsPage.createButton.click();
    // carUpdatePage.driverSelectLastOption();
    await waitUntilDisplayed(carUpdatePage.saveButton);
    await carUpdatePage.save();
    await waitUntilHidden(carUpdatePage.saveButton);
    expect(await isVisible(carUpdatePage.saveButton)).to.be.false;

    expect(await carComponentsPage.createButton.isEnabled()).to.be.true;

    await waitUntilDisplayed(carComponentsPage.table);

    await waitUntilCount(carComponentsPage.records, beforeRecordsCount + 1);
    expect(await carComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);
  });

  it('should delete last Car', async () => {
    const deleteButton = carComponentsPage.getDeleteButton(carComponentsPage.records.last());
    await click(deleteButton);

    carDeleteDialog = new CarDeleteDialog();
    await waitUntilDisplayed(carDeleteDialog.deleteModal);
    expect(await carDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/projectTeamDemoApp.car.delete.question/);
    await carDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(carDeleteDialog.deleteModal);

    expect(await isVisible(carDeleteDialog.deleteModal)).to.be.false;

    await waitUntilAnyDisplayed([carComponentsPage.noRecords, carComponentsPage.table]);

    const afterCount = (await isVisible(carComponentsPage.noRecords)) ? 0 : await getRecordsCount(carComponentsPage.table);
    expect(afterCount).to.eq(beforeRecordsCount);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
