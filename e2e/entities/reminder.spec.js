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
  setPickerValue,
  setDateTimePickerValue,
  scrollTo,
} = require('../utils');

describe('Reminder Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToReminderScreen();
  });

  const navigateToReminderScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('reminderEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('reminderEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('reminderScreen');
  };

  it('should allow you to create, update, and delete the Reminder entity', async () => {
    await expect(element(by.id('reminderScreen'))).toBeVisible();

    /*
     * Create Reminder
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('reminderEditScrollView');
    // date
    await scrollTo('dateInput', 'reminderEditScrollView');
    await setDateTimePickerValue('dateInput', '2023-04-10T13:11:00+02:00', 'ISO8601');
    // status
    await scrollTo('statusInput', 'reminderEditScrollView');
    await setPickerValue('statusInput', 'SKIPPED');
    // save
    await scrollTo('submitButton', 'reminderEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Reminder - validate the creation
     */
    await waitForElementToBeVisibleById('reminderDetailScrollView');
    // date
    await scrollTo('date', 'reminderDetailScrollView');
    const dateCreateAttributes = await element(by.id('date')).getAttributes();
    jestExpect(Date.parse(dateCreateAttributes.label)).toEqual(Date.parse('2023-04-10T13:11:00+02:00'));
    // status
    await scrollTo('status', 'reminderDetailScrollView');
    await expect(element(by.id('status'))).toHaveLabel('SKIPPED');

    /*
     * Update Reminder
     */
    await scrollTo('reminderEditButton', 'reminderDetailScrollView');
    await tapFirstElementByLabel('Reminder Edit Button');
    await waitForElementToBeVisibleById('reminderEditScrollView');
    // date
    await scrollTo('dateInput', 'reminderEditScrollView');
    await setDateTimePickerValue('dateInput', '2023-04-11T05:23:00+02:00', 'ISO8601');
    // status
    await scrollTo('statusInput', 'reminderEditScrollView');
    await setPickerValue('statusInput', 'SKIPPED');
    // save
    await scrollTo('submitButton', 'reminderEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Reminder - validate the update
     */
    await waitForElementToBeVisibleById('reminderDetailScrollView');
    // date
    await scrollTo('date', 'reminderDetailScrollView');
    const dateUpdateAttributes = await element(by.id('date')).getAttributes();
    jestExpect(Date.parse(dateUpdateAttributes.label)).toEqual(Date.parse('2023-04-11T05:23:00+02:00'));
    // status
    await scrollTo('status', 'reminderDetailScrollView');
    await expect(element(by.id('status'))).toHaveLabel('SKIPPED');

    /*
     * Delete
     */
    await scrollTo('reminderDeleteButton', 'reminderDetailScrollView');
    await waitThenTapButton('reminderDeleteButton');
    await waitForElementToBeVisibleById('reminderDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('reminderScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
