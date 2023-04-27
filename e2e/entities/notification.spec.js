const jestExpect = require('expect');
const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('Notification Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToNotificationScreen();
  });

  const navigateToNotificationScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('notificationEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('notificationEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('notificationScreen');
  };

  it('should allow you to create, update, and delete the Notification entity', async () => {
    await expect(element(by.id('notificationScreen'))).toBeVisible();

    /*
     * Create Notification
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('notificationEditScrollView');
    // displayName
    await scrollTo('displayNameInput', 'notificationEditScrollView');
    await element(by.id('displayNameInput')).replaceText('Shirt Associate Unbranded');
    await element(by.id('displayNameInput')).tapReturnKey();
    // notes
    await scrollTo('notesInput', 'notificationEditScrollView');
    await element(by.id('notesInput')).replaceText('homogeneous Bike challenge');
    await element(by.id('notesInput')).tapReturnKey();
    // startDate
    await scrollTo('startDateInput', 'notificationEditScrollView');
    await setDateTimePickerValue('startDateInput', '04/10/23', 'MM/dd/yy');
    // save
    await scrollTo('submitButton', 'notificationEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Notification - validate the creation
     */
    await waitForElementToBeVisibleById('notificationDetailScrollView');
    // displayName
    await scrollTo('displayName', 'notificationDetailScrollView');
    await expect(element(by.id('displayName'))).toHaveLabel('Shirt Associate Unbranded');
    // notes
    await scrollTo('notes', 'notificationDetailScrollView');
    await expect(element(by.id('notes'))).toHaveLabel('homogeneous Bike challenge');
    // startDate
    await scrollTo('startDate', 'notificationDetailScrollView');
    const startDateCreateAttributes = await element(by.id('startDate')).getAttributes();
    jestExpect(Date.parse(startDateCreateAttributes.label)).toEqual(Date.parse('04/10/23'));

    /*
     * Update Notification
     */
    await scrollTo('notificationEditButton', 'notificationDetailScrollView');
    await tapFirstElementByLabel('Notification Edit Button');
    await waitForElementToBeVisibleById('notificationEditScrollView');
    // displayName
    await scrollTo('displayNameInput', 'notificationEditScrollView');
    await element(by.id('displayNameInput')).replaceText('Shirt Associate Unbranded');
    await element(by.id('displayNameInput')).tapReturnKey();
    // notes
    await scrollTo('notesInput', 'notificationEditScrollView');
    await element(by.id('notesInput')).replaceText('homogeneous Bike challenge');
    await element(by.id('notesInput')).tapReturnKey();
    // startDate
    await scrollTo('startDateInput', 'notificationEditScrollView');
    await setDateTimePickerValue('startDateInput', '04/11/23', 'MM/dd/yy');
    // save
    await scrollTo('submitButton', 'notificationEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Notification - validate the update
     */
    await waitForElementToBeVisibleById('notificationDetailScrollView');
    // displayName
    await scrollTo('displayName', 'notificationDetailScrollView');
    await expect(element(by.id('displayName'))).toHaveLabel('Shirt Associate Unbranded');
    // notes
    await scrollTo('notes', 'notificationDetailScrollView');
    await expect(element(by.id('notes'))).toHaveLabel('homogeneous Bike challenge');
    // startDate
    await scrollTo('startDate', 'notificationDetailScrollView');
    const startDateUpdateAttributes = await element(by.id('startDate')).getAttributes();
    jestExpect(Date.parse(startDateUpdateAttributes.label)).toEqual(Date.parse('04/11/23'));

    /*
     * Delete
     */
    await scrollTo('notificationDeleteButton', 'notificationDetailScrollView');
    await waitThenTapButton('notificationDeleteButton');
    await waitForElementToBeVisibleById('notificationDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('notificationScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
