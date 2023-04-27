import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ReminderActions from './reminder.reducer';
import styles from './reminder-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ReminderScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { reminder, reminderList, getAllReminders, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Reminder entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchReminders();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [reminder, fetchReminders]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ReminderDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Reminders Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchReminders = React.useCallback(() => {
    getAllReminders({ page: page - 1, sort, size });
  }, [getAllReminders, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchReminders();
  };
  return (
    <View style={styles.container} testID="reminderScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={reminderList}
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
    reminderList: state.reminders.reminderList,
    reminder: state.reminders.reminder,
    fetching: state.reminders.fetchingAll,
    error: state.reminders.errorAll,
    links: state.reminders.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllReminders: (options) => dispatch(ReminderActions.reminderAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderScreen);
