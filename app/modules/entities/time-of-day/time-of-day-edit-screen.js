import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import TimeOfDayActions from './time-of-day.reducer';
import NotificationActions from '../notification/notification.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './time-of-day-styles';
import MedicationActions from '../medication/medication.reducer';

function TimeOfDayEditScreen(props) {
  const {
    getTimeOfDay,
    updateTimeOfDay,
    route,
    timeOfDay,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllNotifications,
    notificationList,
    updateMedication,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);
  const isNotUpdateEntity = !(route.params && route.params.timeOfDays && route.params.timeOfDays[0] && route.params.timeOfDays[0].id);

  const {
    name,
    dosageQuantity,
    type,
    displayName,
    notes,
    startDate,
    frequencyType,
    saturday,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
  } = route.params ? route.params : null;

  React.useEffect(() => {
    if (!isNewEntity || !isNotUpdateEntity) {
      getTimeOfDay(route.params.timeOfDays[0].id);
    } else {
      reset();
    }
  }, [isNewEntity, getTimeOfDay, route, reset]);

  React.useEffect(() => {
    if (isNewEntity && isNotUpdateEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(route.params.timeOfDays[0]));
    }
  }, [timeOfDay, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('TimeOfDayDetail', { entityId: timeOfDay?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => {
    const timeOfDay = formValueToEntity(data);
    let medication;
    if (isNotUpdateEntity) {
      medication = formValueToMedication(
        {
          name,
          dosageQuantity,
          type,
          displayName,
          notes,
          startDate,
          frequencyType,
          saturday,
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
        },
        timeOfDay.time,
      );
    } else {
      const medicationId = route.params?.medicationId ?? null;
      const notificationId = route.params?.notificationId ?? null;
      const frequencyId = route.params?.frequencyId ?? null;
      medication = formValueToUpdateMedication(
        {
          medicationId,
          name,
          dosageQuantity,
          type,
          displayName,
          notes,
          startDate,
          notificationId,
          frequencyType,
          frequencyId,
          saturday,
          sunday,
          monday,
          tuesday,
          wednesday,
          thursday,
          friday,
        },
        timeOfDay.id,
        timeOfDay.time,
      );
    }
    updateMedication(medication);
    navigation.navigate('MedicationDetail', { entityId: medication?.id });
  };

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const timeRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="timeOfDayEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="time"
              ref={timeRef}
              label="Time"
              placeholder="Enter Time"
              testID="timeInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormButton title={'Submit'} testID={'nextButton'} />
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
    time: value.time ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    time: value.time ?? null,
  };
  return entity;
};

const formValueToMedication = (
  {
    name,
    dosageQuantity,
    type,
    displayName,
    notes,
    startDate,
    frequencyType,
    saturday,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
  },
  time,
) => {
  const entity = {
    name: name ?? null,
    dosageQuantity: dosageQuantity ?? null,
    type: type ?? null,
    notification: {
      displayName: displayName ?? null,
      notes: notes ?? null,
      startDate: startDate ?? null,
      frequency: {
        type: frequencyType ?? null,
        saturday: saturday ?? null,
        sunday: sunday ?? null,
        monday: monday ?? null,
        tuesday: tuesday ?? null,
        wednesday: wednesday ?? null,
        thursday: thursday ?? null,
        friday: friday ?? null,
      },
      timeOfDays: [
        {
          time: time,
        },
      ],
    },
  };

  return entity;
};

const formValueToUpdateMedication = (
  {
    medicationId,
    name,
    dosageQuantity,
    type,
    displayName,
    notificationId,
    notes,
    startDate,
    frequencyType,
    frequencyId,
    saturday,
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
  },
  id,
  time,
) => {
  const entity = {
    id: medicationId ?? null,
    name: name ?? null,
    dosageQuantity: dosageQuantity ?? null,
    type: type ?? null,
    notification: {
      id: notificationId ?? null,
      displayName: displayName ?? null,
      notes: notes ?? null,
      startDate: startDate ?? null,
      frequency: {
        id: frequencyId ?? null,
        type: frequencyType ?? null,
        saturday: saturday ?? null,
        sunday: sunday ?? null,
        monday: monday ?? null,
        tuesday: tuesday ?? null,
        wednesday: wednesday ?? null,
        thursday: thursday ?? null,
        friday: friday ?? null,
      },
      timeOfDays: [
        {
          id: id ?? null,
          time: time,
        },
      ],
    },
  };

  return entity;
};

const mapStateToProps = (state) => {
  return {
    notificationList: state.notifications.notificationList ?? [],
    timeOfDay: state.timeOfDays.timeOfDay,
    fetching: state.timeOfDays.fetchingOne,
    updating: state.timeOfDays.updating,
    updateSuccess: state.timeOfDays.updateSuccess,
    errorUpdating: state.timeOfDays.errorUpdating,
    medication: state.medications.medication,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    getTimeOfDay: (id) => dispatch(TimeOfDayActions.timeOfDayRequest(id)),
    getAllTimeOfDays: (options) => dispatch(TimeOfDayActions.timeOfDayAllRequest(options)),
    updateTimeOfDay: (timeOfDay) => dispatch(TimeOfDayActions.timeOfDayUpdateRequest(timeOfDay)),
    reset: () => dispatch(TimeOfDayActions.timeOfDayReset()),
    updateMedication: (medication) => dispatch(MedicationActions.medicationUpdateRequest(medication)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeOfDayEditScreen);
