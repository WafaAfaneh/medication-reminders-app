import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import TimeOfDayActions from './time-of-day.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import TimeOfDayDeleteModal from './time-of-day-delete-modal';
import styles from './time-of-day-styles';

function TimeOfDayDetailScreen(props) {
  const { route, getTimeOfDay, navigation, timeOfDay, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = timeOfDay?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('TimeOfDay');
      } else {
        setDeleteModalVisible(false);
        getTimeOfDay(routeEntityId);
      }
    }, [routeEntityId, getTimeOfDay, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the TimeOfDay.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="timeOfDayDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{timeOfDay.id}</Text>
      {/* Time Field */}
      <Text style={styles.label}>Time:</Text>
      <Text testID="time">{timeOfDay.time}</Text>
      <Text style={styles.label}>Notification:</Text>
      <Text testID="notification">{String(timeOfDay.notification ? timeOfDay.notification.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('TimeOfDayEdit', { entityId })}
          accessibilityLabel={'TimeOfDay Edit Button'}
          testID="timeOfDayEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'TimeOfDay Delete Button'}
          testID="timeOfDayDeleteButton"
        />
        {deleteModalVisible && (
          <TimeOfDayDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={timeOfDay}
            testID="timeOfDayDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    timeOfDay: state.timeOfDays.timeOfDay,
    error: state.timeOfDays.errorOne,
    fetching: state.timeOfDays.fetchingOne,
    deleting: state.timeOfDays.deleting,
    errorDeleting: state.timeOfDays.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTimeOfDay: (id) => dispatch(TimeOfDayActions.timeOfDayRequest(id)),
    getAllTimeOfDays: (options) => dispatch(TimeOfDayActions.timeOfDayAllRequest(options)),
    deleteTimeOfDay: (id) => dispatch(TimeOfDayActions.timeOfDayDeleteRequest(id)),
    resetTimeOfDays: () => dispatch(TimeOfDayActions.timeOfDayReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeOfDayDetailScreen);
