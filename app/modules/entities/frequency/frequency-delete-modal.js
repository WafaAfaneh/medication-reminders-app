import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FrequencyActions from './frequency.reducer';

import styles from './frequency-styles';

function FrequencyDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteFrequency(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Frequency');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Frequency {entity.id}?</Text>
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
    frequency: state.frequencies.frequency,
    fetching: state.frequencies.fetchingOne,
    deleting: state.frequencies.deleting,
    errorDeleting: state.frequencies.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFrequency: (id) => dispatch(FrequencyActions.frequencyRequest(id)),
    getAllFrequencies: (options) => dispatch(FrequencyActions.frequencyAllRequest(options)),
    deleteFrequency: (id) => dispatch(FrequencyActions.frequencyDeleteRequest(id)),
    resetFrequencies: () => dispatch(FrequencyActions.frequencyReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FrequencyDeleteModal);
