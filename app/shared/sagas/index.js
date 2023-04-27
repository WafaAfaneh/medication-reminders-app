import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { RegisterTypes } from '../../modules/account/register/register.reducer';
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer';
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { FrequencyTypes } from '../../modules/entities/frequency/frequency.reducer';
import { MedicationTypes } from '../../modules/entities/medication/medication.reducer';
import { NotificationTypes } from '../../modules/entities/notification/notification.reducer';
import { TimeOfDayTypes } from '../../modules/entities/time-of-day/time-of-day.reducer';
import { ReminderTypes } from '../../modules/entities/reminder/reminder.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import { register } from '../../modules/account/register/register.sagas';
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas';
import { changePassword } from '../../modules/account/password/change-password.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import FrequencySagas from '../../modules/entities/frequency/frequency.sagas';
import MedicationSagas from '../../modules/entities/medication/medication.sagas';
import NotificationSagas from '../../modules/entities/notification/notification.sagas';
import TimeOfDaySagas from '../../modules/entities/time-of-day/time-of-day.sagas';
import ReminderSagas from '../../modules/entities/reminder/reminder.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(FrequencyTypes.FREQUENCY_REQUEST, FrequencySagas.getFrequency, api),
    takeLatest(FrequencyTypes.FREQUENCY_ALL_REQUEST, FrequencySagas.getAllFrequencies, api),
    takeLatest(FrequencyTypes.FREQUENCY_UPDATE_REQUEST, FrequencySagas.updateFrequency, api),
    takeLatest(FrequencyTypes.FREQUENCY_DELETE_REQUEST, FrequencySagas.deleteFrequency, api),

    takeLatest(MedicationTypes.MEDICATION_REQUEST, MedicationSagas.getMedication, api),
    takeLatest(MedicationTypes.MEDICATION_ALL_REQUEST, MedicationSagas.getAllMedications, api),
    takeLatest(MedicationTypes.MEDICATION_UPDATE_REQUEST, MedicationSagas.updateMedication, api),
    takeLatest(MedicationTypes.MEDICATION_DELETE_REQUEST, MedicationSagas.deleteMedication, api),

    takeLatest(NotificationTypes.NOTIFICATION_REQUEST, NotificationSagas.getNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_ALL_REQUEST, NotificationSagas.getAllNotifications, api),
    takeLatest(NotificationTypes.NOTIFICATION_UPDATE_REQUEST, NotificationSagas.updateNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_DELETE_REQUEST, NotificationSagas.deleteNotification, api),

    takeLatest(TimeOfDayTypes.TIME_OF_DAY_REQUEST, TimeOfDaySagas.getTimeOfDay, api),
    takeLatest(TimeOfDayTypes.TIME_OF_DAY_ALL_REQUEST, TimeOfDaySagas.getAllTimeOfDays, api),
    takeLatest(TimeOfDayTypes.TIME_OF_DAY_UPDATE_REQUEST, TimeOfDaySagas.updateTimeOfDay, api),
    takeLatest(TimeOfDayTypes.TIME_OF_DAY_DELETE_REQUEST, TimeOfDaySagas.deleteTimeOfDay, api),

    takeLatest(ReminderTypes.REMINDER_REQUEST, ReminderSagas.getReminder, api),
    takeLatest(ReminderTypes.REMINDER_ALL_REQUEST, ReminderSagas.getAllReminders, api),
    takeLatest(ReminderTypes.REMINDER_UPDATE_REQUEST, ReminderSagas.updateReminder, api),
    takeLatest(ReminderTypes.REMINDER_DELETE_REQUEST, ReminderSagas.deleteReminder, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
