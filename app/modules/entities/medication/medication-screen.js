import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import MedicationActions from './medication.reducer';
import styles from './medication-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function MedicationScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { medication, medicationList, getAllMedications, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Medication entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchMedications();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [medication, fetchMedications]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('MedicationDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>{item.name}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Medications Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchMedications = React.useCallback(() => {
    getAllMedications({ page: page - 1, sort, size });
  }, [getAllMedications, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchMedications();
  };
  return (
    <View style={styles.container} testID="medicationScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={medicationList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    medicationList: state.medications.medicationList,
    medication: state.medications.medication,
    fetching: state.medications.fetchingAll,
    error: state.medications.errorAll,
    links: state.medications.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllMedications: (options) => dispatch(MedicationActions.medicationAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicationScreen);
