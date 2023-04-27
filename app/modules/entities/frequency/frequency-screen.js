import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import FrequencyActions from './frequency.reducer';
import styles from './frequency-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function FrequencyScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { frequency, frequencyList, getAllFrequencies, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Frequency entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchFrequencies();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [frequency, fetchFrequencies]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('FrequencyDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Frequencies Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchFrequencies = React.useCallback(() => {
    getAllFrequencies({ page: page - 1, sort, size });
  }, [getAllFrequencies, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchFrequencies();
  };
  return (
    <View style={styles.container} testID="frequencyScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={frequencyList}
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
    frequencyList: state.frequencies.frequencyList,
    frequency: state.frequencies.frequency,
    fetching: state.frequencies.fetchingAll,
    error: state.frequencies.errorAll,
    links: state.frequencies.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFrequencies: (options) => dispatch(FrequencyActions.frequencyAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FrequencyScreen);
