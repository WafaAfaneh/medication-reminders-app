import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ReminderActions from './reminder.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ReminderDeleteModal from './reminder-delete-modal';
import styles from './reminder-styles';

function ReminderDetailScreen(props) {
  const { route, getReminder, navigation, reminder, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = reminder?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Reminder');
      } else {
        setDeleteModalVisible(false);
        getReminder(routeEntityId);
      }
    }, [routeEntityId, getReminder, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Reminder.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="reminderDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{reminder.id}</Text>
      {/* Date Field */}
      <Text style={styles.label}>Date:</Text>
      <Text testID="date">{String(reminder.date)}</Text>
      {/* Status Field */}
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{reminder.status}</Text>
      <Text style={styles.label}>Notification:</Text>
      <Text testID="notification">{String(reminder.notification ? reminder.notification.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ReminderEdit', { entityId })}
          accessibilityLabel={'Reminder Edit Button'}
          testID="reminderEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Reminder Delete Button'}
          testID="reminderDeleteButton"
        />
        {deleteModalVisible && (
          <ReminderDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={reminder}
            testID="reminderDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    reminder: state.reminders.reminder,
    error: state.reminders.errorOne,
    fetching: state.reminders.fetchingOne,
    deleting: state.reminders.deleting,
    errorDeleting: state.reminders.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReminder: (id) => dispatch(ReminderActions.reminderRequest(id)),
    getAllReminders: (options) => dispatch(ReminderActions.reminderAllRequest(options)),
    deleteReminder: (id) => dispatch(ReminderActions.reminderDeleteRequest(id)),
    resetReminders: () => dispatch(ReminderActions.reminderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderDetailScreen);
