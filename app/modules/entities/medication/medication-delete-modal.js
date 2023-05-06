import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import MedicationActions from './medication.reducer';

import styles from './medication-styles';

function MedicationDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteMedication(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Medication');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Medication {entity.name}?</Text>
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
    medication: state.medications.medication,
    fetching: state.medications.fetchingOne,
    deleting: state.medications.deleting,
    errorDeleting: state.medications.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMedication: (id) => dispatch(MedicationActions.medicationRequest(id)),
    getAllMedications: (options) => dispatch(MedicationActions.medicationAllRequest(options)),
    deleteMedication: (id) => dispatch(MedicationActions.medicationDeleteRequest(id)),
    resetMedications: () => dispatch(MedicationActions.medicationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicationDeleteModal);
