import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableHighlight,
} from 'react-native';
import { cloneDeep } from 'lodash';

import { updateStreamingServicesAction } from '../../state/streaming/actions';
import { selectUserStreamingServices } from '../../state/streaming/selectors';
import { GENRE_SCREEN } from '../../constants/ROUTES';
import * as baseStyles from '../../styles/styles';

import { STREAMING_SERVICES } from './constants';
import { selectUserId, selectUserIsLoggedIn } from '../../state/auth/selectors';
import { Firebase, db } from '../../../config/Firebase';
import { ScrollView } from 'react-native-gesture-handler';

const StreamingServiceList = ({ navigation }) => {
  const dispatch = useDispatch();
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const [selectedStreamingServices, setSelectedStreamingServices] = useState(
    userStreamingServices
  );
  const isUserLoggedIn = useSelector(selectUserIsLoggedIn);
  const uid = useSelector(selectUserId);

  const saveStreamingServices = () => {
    if (Object.keys(selectedStreamingServices).length !== 0) {
      dispatch(
        updateStreamingServicesAction(
          selectedStreamingServices,
          isUserLoggedIn,
          uid
        )
      );
      navigation.navigate(GENRE_SCREEN);
    } else {
      console.log('SELECT SOMETHING');
    }
  };

  const noStreamingServiceAlert = () => {
    Alert.alert(
      'Oops!',
      'You have to select at least one streaming service.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'Okay',
          onPress: () => console.log('Okay pressed'),
          style: 'default',
        },
      ],
      { cancelable: false }
    );
  };

  const handleStreamingServiceSelection = (streamingService) => {
    if (selectedStreamingServices[streamingService]) {
      const stateCopy = cloneDeep(selectedStreamingServices);

      delete stateCopy[streamingService];
      setSelectedStreamingServices(stateCopy);
    } else {
      setSelectedStreamingServices({
        ...selectedStreamingServices,
        [streamingService]: STREAMING_SERVICES[streamingService],
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.buttonContainer}>
        {Object.keys(STREAMING_SERVICES).map((streamingService) => (
          <View key={streamingService} style={styles.serviceButtonContainer}>
            <TouchableHighlight
              style={
                selectedStreamingServices[streamingService]
                  ? styles.serviceButtonActive
                  : styles.serviceButton
              }
              onPress={() => handleStreamingServiceSelection(streamingService)}
            >
              <Text style={styles.buttonText}>
                {STREAMING_SERVICES[streamingService].displayName}
              </Text>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <TouchableHighlight
          style={styles.submitButton}
          onPress={saveStreamingServices}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
  },
  serviceButtonContainer: {
    height: '5%',
    marginBottom: 20,
  },
  serviceButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    backgroundColor: baseStyles.CANCEL_BUTTON_COLOR,
  },
  serviceButtonActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    backgroundColor: baseStyles.CONTINUE_BUTTON_COLOR,
  },
  buttonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  },
  submitButton: {
    height: '50%',
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    backgroundColor: baseStyles.BUTTON_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitButtonContainer: {
    height: '10%',
    justifyContent: 'center',
  },
});

export default StreamingServiceList;
