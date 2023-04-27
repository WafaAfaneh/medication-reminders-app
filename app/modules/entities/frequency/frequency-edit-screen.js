import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import FrequencyActions from './frequency.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './frequency-styles';

const FrequencyType = [
  {
    label: 'DAILY',
    value: 'DAILY',
  },
  {
    label: 'WEEKLY',
    value: 'WEEKLY',
  },
];

function FrequencyEditScreen(props) {
  const { getFrequency, updateFrequency, route, frequency, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);
  const {name, dosageQuantity, type, displayName, notes, startDate} = route.params? route.params: null;

  React.useEffect(() => {
    if (!isNewEntity) {
      getFrequency(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getFrequency, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(frequency));
    }
  }, [frequency, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('FrequencyDetail', { entityId: frequency?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => {
    const frequency = formValueToEntity(data);
    navigation.navigate('TimeOfDayEdit', {
      name: name,
      dosageQuantity: dosageQuantity,
      type: type,
      displayName: displayName,
      notes: notes,
      startDate: startDate,
      frequencyType: frequency.type,
      saturday: frequency.saturday,
      sunday: frequency.sunday,
      monday: frequency.monday,
      tuesday: frequency.tuesday,
      wednesday: frequency.wednesday,
      thursday: frequency.thursday,
      friday: frequency.friday,
    });
    //updateFrequency(formValueToEntity(data));
  }

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const typeRef = createRef();
  const saturdayRef = createRef();
  const sundayRef = createRef();
  const mondayRef = createRef();
  const tuesdayRef = createRef();
  const wednesdayRef = createRef();
  const thursdayRef = createRef();
  const fridayRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="frequencyEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="type"
              ref={typeRef}
              label="Type"
              placeholder="Enter Type"
              testID="typeInput"
              inputType="select-one"
              listItems={FrequencyType}
              onSubmitEditing={() => saturdayRef.current?.focus()}
            />
            <FormField
              name="saturday"
              ref={saturdayRef}
              label="Saturday"
              placeholder="Enter Saturday"
              testID="saturdayInput"
              inputType="boolean"
              onSubmitEditing={() => sundayRef.current?.focus()}
            />
            <FormField
              name="sunday"
              ref={sundayRef}
              label="Sunday"
              placeholder="Enter Sunday"
              testID="sundayInput"
              inputType="boolean"
              onSubmitEditing={() => mondayRef.current?.focus()}
            />
            <FormField
              name="monday"
              ref={mondayRef}
              label="Monday"
              placeholder="Enter Monday"
              testID="mondayInput"
              inputType="boolean"
              onSubmitEditing={() => tuesdayRef.current?.focus()}
            />
            <FormField
              name="tuesday"
              ref={tuesdayRef}
              label="Tuesday"
              placeholder="Enter Tuesday"
              testID="tuesdayInput"
              inputType="boolean"
              onSubmitEditing={() => wednesdayRef.current?.focus()}
            />
            <FormField
              name="wednesday"
              ref={wednesdayRef}
              label="Wednesday"
              placeholder="Enter Wednesday"
              testID="wednesdayInput"
              inputType="boolean"
              onSubmitEditing={() => thursdayRef.current?.focus()}
            />
            <FormField
              name="thursday"
              ref={thursdayRef}
              label="Thursday"
              placeholder="Enter Thursday"
              testID="thursdayInput"
              inputType="boolean"
              onSubmitEditing={() => fridayRef.current?.focus()}
            />
            <FormField name="friday" ref={fridayRef} label="Friday" placeholder="Enter Friday" testID="fridayInput" inputType="boolean" />

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
    type: value.type ?? null,
    saturday: value.saturday ?? null,
    sunday: value.sunday ?? null,
    monday: value.monday ?? null,
    tuesday: value.tuesday ?? null,
    wednesday: value.wednesday ?? null,
    thursday: value.thursday ?? null,
    friday: value.friday ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    type: value.type ?? null,
    saturday: value.saturday === null ? false : Boolean(value.saturday),
    sunday: value.sunday === null ? false : Boolean(value.sunday),
    monday: value.monday === null ? false : Boolean(value.monday),
    tuesday: value.tuesday === null ? false : Boolean(value.tuesday),
    wednesday: value.wednesday === null ? false : Boolean(value.wednesday),
    thursday: value.thursday === null ? false : Boolean(value.thursday),
    friday: value.friday === null ? false : Boolean(value.friday),
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    frequency: state.frequencies.frequency,
    fetching: state.frequencies.fetchingOne,
    updating: state.frequencies.updating,
    updateSuccess: state.frequencies.updateSuccess,
    errorUpdating: state.frequencies.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFrequency: (id) => dispatch(FrequencyActions.frequencyRequest(id)),
    getAllFrequencies: (options) => dispatch(FrequencyActions.frequencyAllRequest(options)),
    updateFrequency: (frequency) => dispatch(FrequencyActions.frequencyUpdateRequest(frequency)),
    reset: () => dispatch(FrequencyActions.frequencyReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FrequencyEditScreen);
