import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import NotificationActions from './notification.reducer';
import styles from './notification-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function NotificationScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { notification, notificationList, getAllNotifications, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Notification entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchNotifications();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [notification, fetchNotifications]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('NotificationDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Notifications Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchNotifications = React.useCallback(() => {
    getAllNotifications({ page: page - 1, sort, size });
  }, [getAllNotifications, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchNotifications();
  };
  return (
    <View style={styles.container} testID="notificationScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={notificationList}
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
    notificationList: state.notifications.notificationList,
    notification: state.notifications.notification,
    fetching: state.notifications.fetchingAll,
    error: state.notifications.errorAll,
    links: state.notifications.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);
