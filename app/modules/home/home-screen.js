import React from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { Images } from '../../shared/themes';
import styles from './home-screen.styles';

function HomeScreen(props) {
  const { account } = props;

  return (
    <View style={[styles.container, styles.mainContainer]} testID="homeScreen">
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.centered}>
          <Image source={Images.medication} style={styles.logo} />
          <Text style={styles.welcomeText}>Medication Reminder</Text>
          <Text style={styles.welcomeText}>sends you notifications when it is time to take your medication</Text>
        </View>
        {account && account.login ? (
          <View style={[styles.authContainer, styles.authContainerTrue]} testID="authDisplayTrue">
            <TouchableOpacity TouchableOpacity onPress={() => props.navigation.navigate('Entities')}>
              <Text style={styles.authText}>Access Medication</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[styles.authContainer, styles.authContainerFalse]} testID="authDisplayFalse">
            <Text style={styles.authText}>
              <Ionicons name="md-information-circle" size={22} color={'white'} /> You are not signed in.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({ account: state.account.account });
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
