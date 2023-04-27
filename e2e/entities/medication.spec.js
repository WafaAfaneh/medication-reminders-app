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

describe('Medication Screen Tests', () => {
  beforeEach(async () => {
    await reloadApp();
    await loginAsUser();
    await navigateToMedicationScreen();
  });

  const navigateToMedicationScreen = async () => {
    await openAndTapDrawerMenuItemByLabel('Entities');
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await scrollTo('medicationEntityScreenButton', 'entityScreenScrollList');
    await element(by.id('medicationEntityScreenButton')).tap();
    await waitForElementToBeVisibleById('medicationScreen');
  };

  it('should allow you to create, update, and delete the Medication entity', async () => {
    await expect(element(by.id('medicationScreen'))).toBeVisible();

    /*
     * Create Medication
     */
    await tapFirstElementByLabel(' New ');
    await waitForElementToBeVisibleById('medicationEditScrollView');
    // name
    await scrollTo('nameInput', 'medicationEditScrollView');
    await element(by.id('nameInput')).replaceText('Fish');
    await element(by.id('nameInput')).tapReturnKey();
    // dosageQuantity
    await scrollTo('dosageQuantityInput', 'medicationEditScrollView');
    await element(by.id('dosageQuantityInput')).replaceText('24394');
    await element(by.id('dosageQuantityInput')).tapReturnKey();
    // type
    await scrollTo('typeInput', 'medicationEditScrollView');
    await setPickerValue('typeInput', 'POWDER');
    // active
    await scrollTo('activeInput', 'medicationEditScrollView');
    await toggleSwitchToValue('activeInput', false);
    // save
    await scrollTo('submitButton', 'medicationEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Medication - validate the creation
     */
    await waitForElementToBeVisibleById('medicationDetailScrollView');
    // name
    await scrollTo('name', 'medicationDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Fish');
    // dosageQuantity
    await scrollTo('dosageQuantity', 'medicationDetailScrollView');
    await expect(element(by.id('dosageQuantity'))).toHaveLabel('24394');
    // type
    await scrollTo('type', 'medicationDetailScrollView');
    await expect(element(by.id('type'))).toHaveLabel('POWDER');
    // active
    await scrollTo('active', 'medicationDetailScrollView');
    await expect(element(by.id('active'))).toHaveLabel('false');

    /*
     * Update Medication
     */
    await scrollTo('medicationEditButton', 'medicationDetailScrollView');
    await tapFirstElementByLabel('Medication Edit Button');
    await waitForElementToBeVisibleById('medicationEditScrollView');
    // name
    await scrollTo('nameInput', 'medicationEditScrollView');
    await element(by.id('nameInput')).replaceText('Fish');
    await element(by.id('nameInput')).tapReturnKey();
    // dosageQuantity
    await scrollTo('dosageQuantityInput', 'medicationEditScrollView');
    await element(by.id('dosageQuantityInput')).replaceText('64659');
    await element(by.id('dosageQuantityInput')).tapReturnKey();
    // type
    await scrollTo('typeInput', 'medicationEditScrollView');
    await setPickerValue('typeInput', 'TABLET');
    // active
    await scrollTo('activeInput', 'medicationEditScrollView');
    await toggleSwitchToValue('activeInput', true);
    // save
    await scrollTo('submitButton', 'medicationEditScrollView');
    await waitThenTapButton('submitButton');

    /*
     * View Medication - validate the update
     */
    await waitForElementToBeVisibleById('medicationDetailScrollView');
    // name
    await scrollTo('name', 'medicationDetailScrollView');
    await expect(element(by.id('name'))).toHaveLabel('Fish');
    // dosageQuantity
    await scrollTo('dosageQuantity', 'medicationDetailScrollView');
    await expect(element(by.id('dosageQuantity'))).toHaveLabel('64659');
    // type
    await scrollTo('type', 'medicationDetailScrollView');
    await expect(element(by.id('type'))).toHaveLabel('TABLET');
    // active
    await scrollTo('active', 'medicationDetailScrollView');
    await expect(element(by.id('active'))).toHaveLabel('true');

    /*
     * Delete
     */
    await scrollTo('medicationDeleteButton', 'medicationDetailScrollView');
    await waitThenTapButton('medicationDeleteButton');
    await waitForElementToBeVisibleById('medicationDeleteModal');
    await waitThenTapButton('deleteButton');
    await waitForElementToBeVisibleById('medicationScreen');

    /*
     * Logout
     */
    await goBack();
    await waitForElementToBeVisibleById('entityScreenScrollList');
    await logout();
  });
});
