import * as React from 'react';
import { Provider } from 'react-redux';
import createStore from './app/shared/reducers';
import * as SplashScreen from 'expo-splash-screen';

import NavContainer from './app/navigation/nav-container';
import { navigationRef } from './app/navigation/nav-ref';
import messaging from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useRef, useState } from 'react';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const store = createStore();

export default function App() {
  // prevent the splashscreen from disappearing until the redux store is completely ready (hidden in nav-container.js)
  const [displayApp, setDisplayApp] = React.useState(false);
  const [notification, setNotification] = useState(false);
  const [token, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };
  React.useEffect(() => {
    if (!displayApp) {
      SplashScreen.preventAutoHideAsync()
        .then(() => setDisplayApp(true))
        .catch(() => setDisplayApp(true));
    }

    if (requestUserPermission) {
      messaging()
        .getToken()
        .then(async (token) => {
          console.log('This is the FCM token ' + token);
        });
    } else {
      console.log('Failed to get token');
    }

    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // eslint-disable-next-line no-shadow
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        }
      });

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', remoteMessage.notification.body + ' ' + remoteMessage.notification.title);
      const date = new Date(remoteMessage.notification.body);
      const time = date.toLocaleString('en-IN').split(' ')[3];
      //Add 10 seconds to the current date to test it.
      // date.setSeconds(date.getSeconds() + 1);

      await schedulePushNotification(remoteMessage.notification.title, time, date);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      unsubscribe;
    };
  }, [displayApp, setDisplayApp]);

  return displayApp ? (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  ) : null;
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({ experienceId: '@wafaneh/medicationReminderClient' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

async function schedulePushNotification(title, body, date) {
  /*let date = new Date();
  //Add 10 seconds to the current date to test it.
  date.setSeconds(date.getSeconds() + 1);
*/
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: 'Time to take your medication ' + body,
      // data: { data: 'goes here' },
    },
    trigger: {
      date: date,
    },
  });
}
