import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import FrequencyScreen from '../modules/entities/frequency/frequency-screen';
import FrequencyDetailScreen from '../modules/entities/frequency/frequency-detail-screen';
import FrequencyEditScreen from '../modules/entities/frequency/frequency-edit-screen';
import MedicationScreen from '../modules/entities/medication/medication-screen';
import MedicationDetailScreen from '../modules/entities/medication/medication-detail-screen';
import MedicationEditScreen from '../modules/entities/medication/medication-edit-screen';
import NotificationScreen from '../modules/entities/notification/notification-screen';
import NotificationDetailScreen from '../modules/entities/notification/notification-detail-screen';
import NotificationEditScreen from '../modules/entities/notification/notification-edit-screen';
import TimeOfDayScreen from '../modules/entities/time-of-day/time-of-day-screen';
import TimeOfDayDetailScreen from '../modules/entities/time-of-day/time-of-day-detail-screen';
import TimeOfDayEditScreen from '../modules/entities/time-of-day/time-of-day-edit-screen';
import ReminderScreen from '../modules/entities/reminder/reminder-screen';
import ReminderDetailScreen from '../modules/entities/reminder/reminder-detail-screen';
import ReminderEditScreen from '../modules/entities/reminder/reminder-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Frequency',
    route: 'frequency',
    component: FrequencyScreen,
    options: {
      title: 'Frequencies',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('FrequencyEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'FrequencyDetail',
    route: 'frequency/detail',
    component: FrequencyDetailScreen,
    options: { title: 'View Frequency', headerLeft: () => <HeaderBackButton onPress={() => navigate('Frequency')} /> },
  },
  {
    name: 'FrequencyEdit',
    route: 'frequency/edit',
    component: FrequencyEditScreen,
    options: {
      title: 'Edit Frequency',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('FrequencyDetail', 'Frequency')} />,
    },
  },
  {
    name: 'Medication',
    route: 'medication',
    component: MedicationScreen,
    options: {
      title: 'Medications',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('MedicationEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'MedicationDetail',
    route: 'medication/detail',
    component: MedicationDetailScreen,
    options: { title: 'View Medication', headerLeft: () => <HeaderBackButton onPress={() => navigate('Medication')} /> },
  },
  {
    name: 'MedicationEdit',
    route: 'medication/edit',
    component: MedicationEditScreen,
    options: {
      title: 'Edit Medication',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('MedicationDetail', 'Medication')} />,
    },
  },
  {
    name: 'Notification',
    route: 'notification',
    component: NotificationScreen,
    options: {
      title: 'Notifications',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('NotificationEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'NotificationDetail',
    route: 'notification/detail',
    component: NotificationDetailScreen,
    options: { title: 'View Notification', headerLeft: () => <HeaderBackButton onPress={() => navigate('Notification')} /> },
  },
  {
    name: 'NotificationEdit',
    route: 'notification/edit',
    component: NotificationEditScreen,
    options: {
      title: 'Edit Notification',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('NotificationDetail', 'Notification')} />,
    },
  },
  {
    name: 'TimeOfDay',
    route: 'time-of-day',
    component: TimeOfDayScreen,
    options: {
      title: 'TimeOfDays',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('TimeOfDayEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'TimeOfDayDetail',
    route: 'time-of-day/detail',
    component: TimeOfDayDetailScreen,
    options: { title: 'View TimeOfDay', headerLeft: () => <HeaderBackButton onPress={() => navigate('TimeOfDay')} /> },
  },
  {
    name: 'TimeOfDayEdit',
    route: 'time-of-day/edit',
    component: TimeOfDayEditScreen,
    options: {
      title: 'Edit TimeOfDay',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('TimeOfDayDetail', 'TimeOfDay')} />,
    },
  },
  {
    name: 'Reminder',
    route: 'reminder',
    component: ReminderScreen,
    options: {
      title: 'Reminders',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ReminderEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ReminderDetail',
    route: 'reminder/detail',
    component: ReminderDetailScreen,
    options: { title: 'View Reminder', headerLeft: () => <HeaderBackButton onPress={() => navigate('Reminder')} /> },
  },
  {
    name: 'ReminderEdit',
    route: 'reminder/edit',
    component: ReminderEditScreen,
    options: {
      title: 'Edit Reminder',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ReminderDetail', 'Reminder')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
