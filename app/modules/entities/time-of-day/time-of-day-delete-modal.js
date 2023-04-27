import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import TimeOfDayActions from './time-of-day.reducer';

import styles from './time-of-day-styles';

function TimeOfDayDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteTimeOfDay(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('TimeOfDay');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete TimeOfDay {entity.id}?</Text>
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
    timeOfDay: state.timeOfDays.timeOfDay,
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeOfDayDeleteModal);
