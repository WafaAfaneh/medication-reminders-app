const {
  reloadApp,
  loginAsUser,
  logout,
  goBack,
  tapFirstElementByLabel,
  openAndTapDrawerMenuItemByLabel,
  waitThenTapButton,
  waitForElementToBeVisibleById,
  scrollTo,
} = require('../utils');

describe('TimeOfDay Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToTimeOfDayScreen();
  });

  const navigateToTimeOfDayScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('timeOfDayEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('timeOfDayEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('timeOfDayScreen');
  };

  it('should allow you to create, update, and delete the TimeOfDay entity', async () => {
    await expect(element(by.id('timeOfDayScreen'))).toBeVisible();

    /*
     * Create TimeOfDay
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('timeOfDayEditScrollView');
    // time
    await scrollTo('timeInput', 'timeOfDayEditScrollView');
    await element(by.id('timeInput')).replaceText('Division');
    await element(by.id('timeInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'timeOfDayEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View TimeOfDay - validate the creation
     */
    await waitForElementToBeVisibleById('timeOfDayDetailScrollView');
    // time
    await scrollTo('time', 'timeOfDayDetailScrollView');
    await expect(element(by.id('time'))).toHaveLabel('Division');

    /*
     * Update TimeOfDay
     */
    await scrollTo('timeOfDayEditButton', 'timeOfDayDetailScrollView');
    await tapFirstElementByLabel('TimeOfDay Edit Button');
    await waitForElementToBeVisibleById('timeOfDayEditScrollView');
    // time
    await scrollTo('timeInput', 'timeOfDayEditScrollView');
    await element(by.id('timeInput')).replaceText('Division');
    await element(by.id('timeInput')).tapReturnKey();
    // save
    await scrollTo('submitButton', 'timeOfDayEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View TimeOfDay - validate the update
     */
    await waitForElementToBeVisibleById('timeOfDayDetailScrollView');
    // time
    await scrollTo('time', 'timeOfDayDetailScrollView');
    await expect(element(by.id('time'))).toHaveLabel('Division');

    /*
     * Delete
     */
    await scrollTo('timeOfDayDeleteButton', 'timeOfDayDetailScrollView');
    await waitThenTapButton('timeOfDayDeleteButton');
    await waitForElementToBeVisibleById('timeOfDayDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('timeOfDayScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
