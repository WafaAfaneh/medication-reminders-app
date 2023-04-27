import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>Go To Medication</Text>
      <RoundedButton text="Medication" onPress={() => navigation.navigate('Medication')} testID="medicationEntityScreenButton" />
    </ScrollView>
  );
}
