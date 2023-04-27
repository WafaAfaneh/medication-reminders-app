export default {
  // Functions return fixtures

  // entity fixtures
  updateFrequency: (frequency) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-frequency.json'),
    };
  },
  getAllFrequencies: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-frequencies.json'),
    };
  },
  getFrequency: (frequencyId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-frequency.json'),
    };
  },
  deleteFrequency: (frequencyId) => {
    return {
      ok: true,
    };
  },
  updateMedication: (medication) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-medication.json'),
    };
  },
  getAllMedications: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-medications.json'),
    };
  },
  getMedication: (medicationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-medication.json'),
    };
  },
  deleteMedication: (medicationId) => {
    return {
      ok: true,
    };
  },
  updateNotification: (notification) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-notification.json'),
    };
  },
  getAllNotifications: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-notifications.json'),
    };
  },
  getNotification: (notificationId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-notification.json'),
    };
  },
  deleteNotification: (notificationId) => {
    return {
      ok: true,
    };
  },
  updateTimeOfDay: (timeOfDay) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-time-of-day.json'),
    };
  },
  getAllTimeOfDays: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-time-of-days.json'),
    };
  },
  getTimeOfDay: (timeOfDayId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-time-of-day.json'),
    };
  },
  deleteTimeOfDay: (timeOfDayId) => {
    return {
      ok: true,
    };
  },
  updateReminder: (reminder) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-reminder.json'),
    };
  },
  getAllReminders: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-reminders.json'),
    };
  },
  getReminder: (reminderId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-reminder.json'),
    };
  },
  deleteReminder: (reminderId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
