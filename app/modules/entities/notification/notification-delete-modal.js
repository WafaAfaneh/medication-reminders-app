import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import NotificationActions from './notification.reducer';

import styles from './notification-styles';

function NotificationDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteNotification(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Notification');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Notification {entity.id}?</Text>
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
    notification: state.notifications.notification,
    fetching: state.notifications.fetchingOne,
    deleting: state.notifications.deleting,
    errorDeleting: state.notifications.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotification: (id) => dispatch(NotificationActions.notificationRequest(id)),
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    deleteNotification: (id) => dispatch(NotificationActions.notificationDeleteRequest(id)),
    resetNotifications: () => dispatch(NotificationActions.notificationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDeleteModal);
