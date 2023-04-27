import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import NotificationActions from './notification.reducer';
import FrequencyActions from '../frequency/frequency.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './notification-styles';

function NotificationEditScreen(props) {
  const {
    getNotification,
    updateNotification,
    route,
    notification,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllFrequencies,
    frequencyList,
    getAllUsers,
    userList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  const name = route.params?.name ?? null;
  const type = route.params?.type ?? null;
  const dosageQuantity = route.params?.dosageQuantity ?? null;

  React.useEffect(() => {
    if (!isNewEntity) {
      getNotification(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getNotification, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(notification));
    }
  }, [notification, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllFrequencies();
    getAllUsers();
  }, [getAllFrequencies, getAllUsers]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack()
          ? navigation.replace('NotificationDetail', { entityId: notification?.id })
          : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => {
    const notification = formValueToEntity(data);
    //updateNotification(formValueToEntity(data));
    navigation.navigate('FrequencyEdit', {
      name: name,
      dosageQuantity: dosageQuantity,
      type: type,
      displayName: notification.displayName,
      notes: notification.notes,
      startDate: notification.startDate
    });
  }

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const displayNameRef = createRef();
  const notesRef = createRef();
  const startDateRef = createRef();
  const frequencyRef = createRef();
  const userRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="notificationEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="displayName"
              ref={displayNameRef}
              label="Display Name"
              placeholder="Enter Display Name"
              testID="displayNameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => notesRef.current?.focus()}
            />
            <FormField
              name="notes"
              ref={notesRef}
              label="Notes"
              placeholder="Enter Notes"
              testID="notesInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => startDateRef.current?.focus()}
            />
            <FormField
              name="startDate"
              ref={startDateRef}
              label="Start Date"
              placeholder="Enter Start Date"
              testID="startDateInput"
              inputType="date"
            />
            {/*<FormField
              name="frequency"
              inputType="select-one"
              ref={frequencyRef}
              listItems={frequencyList}
              listItemLabelField="id"
              label="Frequency"
              placeholder="Select Frequency"
              testID="frequencySelectInput"
            />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="id"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
            />*/}

            <FormButton title={'Next'} testID={'nextButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    displayName: value.displayName ?? null,
    notes: value.notes ?? null,
    startDate: value.startDate ?? null,
    //frequency: value.frequency && value.frequency.id ? value.frequency.id : null,
    //user: value.user && value.user.id ? value.user.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    displayName: value.displayName ?? null,
    notes: value.notes ?? null,
    startDate: value.startDate ?? null,
  };
  //entity.frequency = value.frequency ? { id: value.frequency } : null;
  //entity.user = value.user ? { id: value.user } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    frequencyList: state.frequencies.frequencyList ?? [],
    userList: state.users.userList ?? [],
    notification: state.notifications.notification,
    fetching: state.notifications.fetchingOne,
    updating: state.notifications.updating,
    updateSuccess: state.notifications.updateSuccess,
    errorUpdating: state.notifications.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllFrequencies: (options) => dispatch(FrequencyActions.frequencyAllRequest(options)),
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getNotification: (id) => dispatch(NotificationActions.notificationRequest(id)),
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    updateNotification: (notification) => dispatch(NotificationActions.notificationUpdateRequest(notification)),
    reset: () => dispatch(NotificationActions.notificationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationEditScreen);
