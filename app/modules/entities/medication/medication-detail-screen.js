import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MedicationActions from './medication.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import MedicationDeleteModal from './medication-delete-modal';
import styles from './medication-styles';

function MedicationDetailScreen(props) {
  const { route, getMedication, navigation, medication, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = medication?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Medication');
      } else {
        setDeleteModalVisible(false);
        getMedication(routeEntityId);
      }
    }, [routeEntityId, getMedication, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Medication.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="medicationDetailScrollView">
      <Text style={styles.label}>Medication ={'>'} </Text>
      <Text style={styles.labelMargin}>Id:</Text>
      <Text style={styles.valueMargin}>{medication.id}</Text>
      {/* Name Field */}
      <Text style={styles.labelMargin}>Name:</Text>
      <Text style={styles.valueMargin} testID="name">
        {medication.name}
      </Text>
      {/* DosageQuantity Field */}
      <Text style={styles.labelMargin}>DosageQuantity:</Text>
      <Text style={styles.valueMargin} testID="dosageQuantity">
        {medication.dosageQuantity}
      </Text>
      {/* Type Field */}
      <Text style={styles.labelMargin}>Type:</Text>
      <Text style={styles.valueMargin} testID="type">
        {medication.type}
      </Text>

      <Text />
      <Text style={styles.label}>Notification ={'>'}</Text>
      {/* DisplayName Field */}
      <Text style={styles.labelMargin}>DisplayName:</Text>
      <Text style={styles.valueMargin} testID="displayName">
        {medication.notification.displayName}
      </Text>
      {/* Notes Field */}
      <Text style={styles.labelMargin}>Notes:</Text>
      <Text style={styles.valueMargin} testID="notes">
        {medication.notification.notes}
      </Text>
      {/* StartDate Field */}
      <Text style={styles.labelMargin}>StartDate:</Text>
      {/*<Text style={styles.valueMargin} testID="startDate">{convertLocalDateToString(medication.notification.startDate)}</Text>*/}
      <Text style={styles.valueMargin} testID="startDate">
        {medication.notification.startDate}
      </Text>

      <Text />
      <Text style={styles.label}>Remind Me ={'>'}</Text>
      {/* Frequency Type Field */}
      <Text style={styles.valueMargin} testID="displayName">
        {medication.notification.frequency.type} {medication.notification.frequency.type == 'WEEKLY' && 'On: '}
      </Text>
      {/* Notes Field */}
      {medication.notification.frequency.type == 'WEEKLY' && medication.notification.frequency.saturday == true && (
        <Text style={styles.valueMargin} testID="saturday">
          Saturday
        </Text>
      )}

      {medication.notification.frequency.type == 'WEEKLY' && medication.notification.frequency.sunday == true && (
        <Text style={styles.valueMargin} testID="sunday">
          Sunday
        </Text>
      )}

      {medication.notification.frequency.type == 'WEEKLY' && medication.notification.frequency.monday == true && (
        <Text style={styles.valueMargin} testID="monday">
          Monday
        </Text>
      )}

      {medication.notification.frequency.type == 'WEEKLY' && medication.notification.frequency.tuesday == true && (
        <Text style={styles.valueMargin} testID="tuesday">
          Tuesday
        </Text>
      )}

      {medication.notification.frequency.type == 'WEEKLY' && medication.notification.frequency.wednesday == true && (
        <Text style={styles.valueMargin} testID="wednesday">
          Wednesday
        </Text>
      )}

      {medication.notification.frequency.type == 'WEEKLY' && medication.notification.frequency.thursday == true && (
        <Text style={styles.valueMargin} testID="thursday">
          Thursday
        </Text>
      )}

      {medication.notification.frequency.type == 'WEEKLY' && medication.notification.frequency.friday == true && (
        <Text style={styles.valueMargin} testID="friday">
          Friday
        </Text>
      )}

      <Text style={styles.label}>Time of Day ={'>'}</Text>
      <Text style={styles.valueMargin} testID="timeOfDay">
        {medication.notification.timeOfDays[0].time}
      </Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('MedicationEdit', { entityId })}
          accessibilityLabel={'Medication Edit Button'}
          testID="medicationEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Medication Delete Button'}
          testID="medicationDeleteButton"
        />
        {deleteModalVisible && (
          <MedicationDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={medication}
            testID="medicationDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    medication: state.medications.medication,
    error: state.medications.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicationDetailScreen);
