import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ReminderActions from './reminder.reducer';

import styles from './reminder-styles';

function ReminderDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteReminder(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Reminder');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Reminder {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    reminder: state.reminders.reminder,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReminderDeleteModal);
