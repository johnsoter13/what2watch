import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableHighlight,
  ScrollView,
  Image,
} from 'react-native'
import { cloneDeep } from 'lodash'

import { updateStreamingServicesAction } from '../../state/streaming/actions'
import { selectUserStreamingServices } from '../../state/streaming/selectors'
import { MOVIE_SCREEN } from '../../constants/ROUTES'
import * as baseStyles from '../../styles/styles'

import { STREAMING_SERVICES } from './constants'
import { fetchMostPopularMoviesActions } from '../../state/movies/actions'

const StreamingServiceList = ({ navigation }) => {
  const dispatch = useDispatch()
  const userStreamingServices = useSelector(selectUserStreamingServices)
  const [selectedStreamingServices, setSelectedStreamingServices] = useState(
    userStreamingServices
  )

  const saveStreamingServices = () => {
    if (Object.keys(selectedStreamingServices).length !== 0) {
      dispatch(updateStreamingServicesAction(selectedStreamingServices))
      dispatch(fetchMostPopularMoviesActions())
      navigation.navigate(MOVIE_SCREEN)
    } else {
      console.log('SELECT SOMETHING')
    }
  }

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
    )
  }

  const handleStreamingServiceSelection = (streamingService) => {
    if (selectedStreamingServices[streamingService]) {
      const stateCopy = cloneDeep(selectedStreamingServices)

      delete stateCopy[streamingService]
      setSelectedStreamingServices(stateCopy)
    } else {
      setSelectedStreamingServices({
        ...selectedStreamingServices,
        [streamingService]: STREAMING_SERVICES[streamingService],
      })
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.listContainer}>
          {Object.keys(STREAMING_SERVICES).map((streamingService) => (
            <View key={streamingService} style={styles.serviceButtonContainer}>
              <TouchableHighlight
                style={
                  selectedStreamingServices[streamingService]
                    ? styles.serviceButtonActive
                    : styles.serviceButton
                }
                onPress={() =>
                  handleStreamingServiceSelection(streamingService)
                }
              >
                <View style={styles.streamingServiceContainer}>
                  <Image
                    style={styles.icon}
                    source={require(`../../../assets/${STREAMING_SERVICES[streamingService].icon}`)}
                  />
                  <Text style={styles.buttonText}>
                    {STREAMING_SERVICES[streamingService].displayName}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          ))}
        </View>
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
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flex: '1 1 0',
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  listContainer: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  streamingServiceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  serviceButtonContainer: {
    padding: 20,
    width: '50%',
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
  icon: {
    width: '144px',
    height: '144px',
  },
})

export default StreamingServiceList
