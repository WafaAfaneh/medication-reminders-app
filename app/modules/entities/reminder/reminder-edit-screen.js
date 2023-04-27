import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ReminderActions from './reminder.reducer';
import NotificationActions from '../notification/notification.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './reminder-styles';

const Status = [
  {
    label: 'TAKEN',
    value: 'TAKEN',
  },
  {
    label: 'SKIPPED',
    value: 'SKIPPED',
  },
  {
    label: 'NOT_INTERACTED',
    value: 'NOT_INTERACTED',
  },
];

function ReminderEditScreen(props) {
  const {
    getReminder,
    updateReminder,
    route,
    reminder,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllNotifications,
    notificationList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getReminder(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getReminder, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(reminder));
    }
  }, [reminder, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllNotifications();
  }, [getAllNotifications]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ReminderDetail', { entityId: reminder?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateReminder(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const dateRef = createRef();
  const statusRef = createRef();
  const notificationRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="reminderEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField name="date" ref={dateRef} label="Date" placeholder="Enter Date" testID="dateInput" inputType="datetime" />
            <FormField
              name="status"
              ref={statusRef}
              label="Status"
              placeholder="Enter Status"
              testID="statusInput"
              inputType="select-one"
              listItems={Status}
            />
            <FormField
              name="notification"
              inputType="select-one"
              ref={notificationRef}
              listItems={notificationList}
              listItemLabelField="id"
              label="Notification"
              placeholder="Select Notification"
              testID="notificationSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
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
    date: value.date ?? null,
    status: value.status ?? null,
    notification: value.notification && value.notification.id ? value.notification.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    date: value.date ?? null,
    status: value.status ?? null,
  };
  entity.notification = value.notification ? { id: value.notification } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    notificationList: state.notifications.notificationList ?? [],
    reminder: state.reminders.reminder,
    fetching: state.reminders.fetchingOne,
    updating: state.reminders.updating,
    updateSuccess: state.reminders.updateSuccess,
    errorUpdating: state.reminders.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    getReminder: (id) => dispatch(ReminderActions.reminderRequest(id)),
    getAllReminders: (options) => dispatch(ReminderActions.reminderAllRequest(options)),
    updateReminder: (reminder) => dispatch(ReminderActions.reminderUpdateRequest(reminder)),
    reset: () => dispatch(ReminderActions.reminderReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderEditScreen);
