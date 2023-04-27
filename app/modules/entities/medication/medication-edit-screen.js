import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import MedicationActions from './medication.reducer';
import NotificationActions from '../notification/notification.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './medication-styles';

const MedicationType = [
  {
    label: 'CAPSULE',
    value: 'CAPSULE',
  },
  {
    label: 'TABLET',
    value: 'TABLET',
  },
  {
    label: 'LIQUID',
    value: 'LIQUID',
  },
  {
    label: 'TOPICAL',
    value: 'TOPICAL',
  },
  {
    label: 'CREAM',
    value: 'CREAM',
  },
  {
    label: 'FOAM',
    value: 'FOAM',
  },
  {
    label: 'POWDER',
    value: 'POWDER',
  },
  {
    label: 'SPRAY',
    value: 'SPRAY',
  },
];

function MedicationEditScreen(props) {
  const {
    getMedication,
    updateMedication,
    route,
    medication,
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
      getMedication(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getMedication, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(medication));
    }
  }, [medication, fetching, isNewEntity]);

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
        isNewEntity || !navigation.canGoBack() ? navigation.replace('MedicationDetail', { entityId: medication?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => {
    const medication = formValueToEntity(data);
    navigation.navigate('NotificationEdit', {
      name: medication.name,
      type: medication.type,
      dosageQuantity: medication.dosageQuantity
    });
    //updateMedication(formValueToEntity(data));
  }

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const dosageQuantityRef = createRef();
  const typeRef = createRef();
  const activeRef = createRef();
  const notificationRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="medicationEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => dosageQuantityRef.current?.focus()}
            />
            <FormField
              name="dosageQuantity"
              ref={dosageQuantityRef}
              label="Dosage Quantity"
              placeholder="Enter Dosage Quantity"
              testID="dosageQuantityInput"
              inputType="number"
            />
            <FormField
              name="type"
              ref={typeRef}
              label="Type"
              placeholder="Enter Type"
              testID="typeInput"
              inputType="select-one"
              listItems={MedicationType}
              onSubmitEditing={() => activeRef.current?.focus()}
            />
            {/*<FormField name="active" ref={activeRef} label="Active" placeholder="Enter Active" testID="activeInput" inputType="boolean" />*/}
            {/*<FormField*/}
            {/*  name="notification"*/}
            {/*  inputType="select-one"*/}
            {/*  ref={notificationRef}*/}
            {/*  listItems={notificationList}*/}
            {/*  listItemLabelField="id"*/}
            {/*  label="Notification"*/}
            {/*  placeholder="Select Notification"*/}
            {/*  testID="notificationSelectInput"*/}
            {/*/>*/}
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
    name: value.name ?? null,
    dosageQuantity: value.dosageQuantity ?? null,
    type: value.type ?? null,
    active: value.active ?? null,
    notification: value.notification && value.notification.id ? value.notification.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    dosageQuantity: value.dosageQuantity ?? null,
    type: value.type ?? null,
    active: value.active === null ? false : Boolean(value.active),
  };
  entity.notification = value.notification ? { id: value.notification } : null;
  //entity.notification = value.notification ? value.notification : null;

  return entity;
};

const mapStateToProps = (state) => {
  return {
    notificationList: state.notifications.notificationList ?? [],
    medication: state.medications.medication,
    fetching: state.medications.fetchingOne,
    updating: state.medications.updating,
    updateSuccess: state.medications.updateSuccess,
    errorUpdating: state.medications.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllNotifications: (options) => dispatch(NotificationActions.notificationAllRequest(options)),
    getMedication: (id) => dispatch(MedicationActions.medicationRequest(id)),
    getAllMedications: (options) => dispatch(MedicationActions.medicationAllRequest(options)),
    updateMedication: (medication) => dispatch(MedicationActions.medicationUpdateRequest(medication)),
    reset: () => dispatch(MedicationActions.medicationReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicationEditScreen);
