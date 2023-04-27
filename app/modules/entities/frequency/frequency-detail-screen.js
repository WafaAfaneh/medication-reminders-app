import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import FrequencyActions from './frequency.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import FrequencyDeleteModal from './frequency-delete-modal';
import styles from './frequency-styles';

function FrequencyDetailScreen(props) {
  const { route, getFrequency, navigation, frequency, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = frequency?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Frequency');
      } else {
        setDeleteModalVisible(false);
        getFrequency(routeEntityId);
      }
    }, [routeEntityId, getFrequency, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Frequency.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="frequencyDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{frequency.id}</Text>
      {/* Type Field */}
      <Text style={styles.label}>Type:</Text>
      <Text testID="type">{frequency.type}</Text>
      {/* Saturday Field */}
      <Text style={styles.label}>Saturday:</Text>
      <Text testID="saturday">{String(frequency.saturday)}</Text>
      {/* Sunday Field */}
      <Text style={styles.label}>Sunday:</Text>
      <Text testID="sunday">{String(frequency.sunday)}</Text>
      {/* Monday Field */}
      <Text style={styles.label}>Monday:</Text>
      <Text testID="monday">{String(frequency.monday)}</Text>
      {/* Tuesday Field */}
      <Text style={styles.label}>Tuesday:</Text>
      <Text testID="tuesday">{String(frequency.tuesday)}</Text>
      {/* Wednesday Field */}
      <Text style={styles.label}>Wednesday:</Text>
      <Text testID="wednesday">{String(frequency.wednesday)}</Text>
      {/* Thursday Field */}
      <Text style={styles.label}>Thursday:</Text>
      <Text testID="thursday">{String(frequency.thursday)}</Text>
      {/* Friday Field */}
      <Text style={styles.label}>Friday:</Text>
      <Text testID="friday">{String(frequency.friday)}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('FrequencyEdit', { entityId })}
          accessibilityLabel={'Frequency Edit Button'}
          testID="frequencyEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Frequency Delete Button'}
          testID="frequencyDeleteButton"
        />
        {deleteModalVisible && (
          <FrequencyDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={frequency}
            testID="frequencyDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    frequency: state.frequencies.frequency,
    error: state.frequencies.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(FrequencyDetailScreen);
