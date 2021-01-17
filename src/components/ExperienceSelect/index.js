import React, {useState} from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import {
  CREATED_ROOM,
  STREAMING_SERVICES_SCREEN,
} from '../../constants/ROUTES';
import * as baseStyles from '../../styles/styles';

const ExperienceSelect = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.experienceButton}
          onPress={() => navigation.navigate(STREAMING_SERVICES_SCREEN)}
        >
        <Text style={styles.experienceButtonText}>
          Solo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.experienceButton}
        onPress={() => navigation.navigate(CREATED_ROOM)}
      >
        <Text style={styles.experienceButtonText}>
          Group
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: 20,

  },
  buttonContainer: {
    width: '100%',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: 'center'
  },
  experienceButton: {
    maxHeight: '20%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    marginBottom: 50,
  },
  experienceButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
    fontSize: 28
  },
});

export default ExperienceSelect;