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
  scrollTo,
} = require('../utils');

describe('Frequency Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToFrequencyScreen();
  });

  const navigateToFrequencyScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('frequencyEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('frequencyEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('frequencyScreen');
  };

  it('should allow you to create, update, and delete the Frequency entity', async () => {
    await expect(element(by.id('frequencyScreen'))).toBeVisible();

    /*
     * Create Frequency
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('frequencyEditScrollView');
    // type
    await scrollTo('typeInput', 'frequencyEditScrollView');
    await setPickerValue('typeInput', 'DAILY');
    // saturday
    await scrollTo('saturdayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('saturdayInput', false);
    // sunday
    await scrollTo('sundayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('sundayInput', true);
    // monday
    await scrollTo('mondayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('mondayInput', true);
    // tuesday
    await scrollTo('tuesdayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('tuesdayInput', false);
    // wednesday
    await scrollTo('wednesdayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('wednesdayInput', true);
    // thursday
    await scrollTo('thursdayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('thursdayInput', false);
    // friday
    await scrollTo('fridayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('fridayInput', false);
    // save
    await scrollTo('submitButton', 'frequencyEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Frequency - validate the creation
     */
    await waitForElementToBeVisibleById('frequencyDetailScrollView');
    // type
    await scrollTo('type', 'frequencyDetailScrollView');
    await expect(element(by.id('type'))).toHaveLabel('DAILY');
    // saturday
    await scrollTo('saturday', 'frequencyDetailScrollView');
    await expect(element(by.id('saturday'))).toHaveLabel('false');
    // sunday
    await scrollTo('sunday', 'frequencyDetailScrollView');
    await expect(element(by.id('sunday'))).toHaveLabel('true');
    // monday
    await scrollTo('monday', 'frequencyDetailScrollView');
    await expect(element(by.id('monday'))).toHaveLabel('true');
    // tuesday
    await scrollTo('tuesday', 'frequencyDetailScrollView');
    await expect(element(by.id('tuesday'))).toHaveLabel('false');
    // wednesday
    await scrollTo('wednesday', 'frequencyDetailScrollView');
    await expect(element(by.id('wednesday'))).toHaveLabel('true');
    // thursday
    await scrollTo('thursday', 'frequencyDetailScrollView');
    await expect(element(by.id('thursday'))).toHaveLabel('false');
    // friday
    await scrollTo('friday', 'frequencyDetailScrollView');
    await expect(element(by.id('friday'))).toHaveLabel('false');

    /*
     * Update Frequency
     */
    await scrollTo('frequencyEditButton', 'frequencyDetailScrollView');
    await tapFirstElementByLabel('Frequency Edit Button');
    await waitForElementToBeVisibleById('frequencyEditScrollView');
    // type
    await scrollTo('typeInput', 'frequencyEditScrollView');
    await setPickerValue('typeInput', 'DAILY');
    // saturday
    await scrollTo('saturdayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('saturdayInput', true);
    // sunday
    await scrollTo('sundayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('sundayInput', true);
    // monday
    await scrollTo('mondayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('mondayInput', false);
    // tuesday
    await scrollTo('tuesdayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('tuesdayInput', true);
    // wednesday
    await scrollTo('wednesdayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('wednesdayInput', true);
    // thursday
    await scrollTo('thursdayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('thursdayInput', true);
    // friday
    await scrollTo('fridayInput', 'frequencyEditScrollView');
    await toggleSwitchToValue('fridayInput', false);
    // save
    await scrollTo('submitButton', 'frequencyEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Frequency - validate the update
     */
    await waitForElementToBeVisibleById('frequencyDetailScrollView');
    // type
    await scrollTo('type', 'frequencyDetailScrollView');
    await expect(element(by.id('type'))).toHaveLabel('DAILY');
    // saturday
    await scrollTo('saturday', 'frequencyDetailScrollView');
    await expect(element(by.id('saturday'))).toHaveLabel('true');
    // sunday
    await scrollTo('sunday', 'frequencyDetailScrollView');
    await expect(element(by.id('sunday'))).toHaveLabel('true');
    // monday
    await scrollTo('monday', 'frequencyDetailScrollView');
    await expect(element(by.id('monday'))).toHaveLabel('false');
    // tuesday
    await scrollTo('tuesday', 'frequencyDetailScrollView');
    await expect(element(by.id('tuesday'))).toHaveLabel('true');
    // wednesday
    await scrollTo('wednesday', 'frequencyDetailScrollView');
    await expect(element(by.id('wednesday'))).toHaveLabel('true');
    // thursday
    await scrollTo('thursday', 'frequencyDetailScrollView');
    await expect(element(by.id('thursday'))).toHaveLabel('true');
    // friday
    await scrollTo('friday', 'frequencyDetailScrollView');
    await expect(element(by.id('friday'))).toHaveLabel('false');

    /*
     * Delete
     */
    await scrollTo('frequencyDeleteButton', 'frequencyDetailScrollView');
    await waitThenTapButton('frequencyDeleteButton');
    await waitForElementToBeVisibleById('frequencyDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('frequencyScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
