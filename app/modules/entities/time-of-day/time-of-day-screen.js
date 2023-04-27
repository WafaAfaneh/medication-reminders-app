import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import TimeOfDayActions from './time-of-day.reducer';
import styles from './time-of-day-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function TimeOfDayScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { timeOfDay, timeOfDayList, getAllTimeOfDays, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('TimeOfDay entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchTimeOfDays();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [timeOfDay, fetchTimeOfDays]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('TimeOfDayDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No TimeOfDays Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchTimeOfDays = React.useCallback(() => {
    getAllTimeOfDays({ page: page - 1, sort, size });
  }, [getAllTimeOfDays, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchTimeOfDays();
  };
  return (
    <View style={styles.container} testID="timeOfDayScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={timeOfDayList}
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
    timeOfDayList: state.timeOfDays.timeOfDayList,
    timeOfDay: state.timeOfDays.timeOfDay,
    fetching: state.timeOfDays.fetchingAll,
    error: state.timeOfDays.errorAll,
    links: state.timeOfDays.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTimeOfDays: (options) => dispatch(TimeOfDayActions.timeOfDayAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeOfDayScreen);
