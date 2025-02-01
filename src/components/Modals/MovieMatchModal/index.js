import React from 'react'
import { useSelector } from 'react-redux'

import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { closeModalAction } from '../../../state/modal/actions'
import * as baseStyles from '../../../styles/styles'
import { checkIfMovieIsAvailableToUser } from '../../../utils/moviesUtils'
import { selectUserStreamingServices } from '../../../state/streaming/selectors'
import MovieListItem from '../../MovieListItem'
import { selectMovie } from '../../../state/movies/selectors'

const MovieMatchModal = ({ movieId }) => {
  const dispatch = useDispatch()
  const movie = useSelector((state) => selectMovie(state, movieId))
  const userStreamingServices = useSelector(selectUserStreamingServices)

  const sharedServices = checkIfMovieIsAvailableToUser(
    userStreamingServices,
    movie
  )

  return (
    <View>
      <Modal
        style={baseStyles.MODAL_STYLES}
        animationType='slide'
        transparent={true}
        visible={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        <Text style={styles.title}>You have a new match!</Text>
        <MovieListItem
          movie={movie}
          sharedServices={sharedServices}
          swipeCard
        />
        <TouchableHighlight
          style={styles.continueButton}
          onPress={() => {
            dispatch(closeModalAction())
          }}
        >
          <Text style={styles.continueButtonText}>Continue Swiping</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  )
}

export default MovieMatchModal

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 20,
    borderBottomColor: 'black',
    width: '100%',
    padding: 5,
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  continueButton: {
    margin: 10,
    backgroundColor: baseStyles.BUTTON_COLOR,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
  },
})
