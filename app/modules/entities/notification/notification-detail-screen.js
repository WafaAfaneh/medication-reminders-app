import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { convertLocalDateToString } from '../../../shared/util/date-transforms';

import NotificationActions from './notification.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import NotificationDeleteModal from './notification-delete-modal';
import styles from './notification-styles';

function NotificationDetailScreen(props) {
  const { route, getNotification, navigation, notification, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = notification?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Notification');
      } else {
        setDeleteModalVisible(false);
        getNotification(routeEntityId);
      }
    }, [routeEntityId, getNotification, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Notification.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="notificationDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{notification.id}</Text>
      {/* DisplayName Field */}
      <Text style={styles.label}>DisplayName:</Text>
      <Text testID="displayName">{notification.displayName}</Text>
      {/* Notes Field */}
      <Text style={styles.label}>Notes:</Text>
      <Text testID="notes">{notification.notes}</Text>
      {/* StartDate Field */}
      <Text style={styles.label}>StartDate:</Text>
      <Text testID="startDate">{convertLocalDateToString(notification.startDate)}</Text>
      <Text style={styles.label}>Frequency:</Text>
      <Text testID="frequency">{String(notification.frequency ? notification.frequency.id : '')}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(notification.user ? notification.user.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('NotificationEdit', { entityId })}
          accessibilityLabel={'Notification Edit Button'}
          testID="notificationEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Notification Delete Button'}
          testID="notificationDeleteButton"
        />
        {deleteModalVisible && (
          <NotificationDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={notification}
            testID="notificationDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications.notification,
    error: state.notifications.errorOne,
    fetching: state.notifications.fetchingOne,
    deleting: state.notifications.deleting,
    errorDeleting: state.notifications.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: (id) => dispatch(NotificationActions.notificationRequest(id)),
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    deleteNotification: (id) => dispatch(NotificationActions.notificationDeleteRequest(id)),
    resetNotifications: () => dispatch(NotificationActions.notificationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetailScreen);
