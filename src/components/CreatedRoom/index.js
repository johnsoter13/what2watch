import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from 'react-native'
import * as Clipboard from 'expo-clipboard'

import { STREAMING_SERVICES_SCREEN } from '../../constants/ROUTES'
import Hashids from 'hashids'
import * as baseStyles from '../../styles/styles'
import { movieListIndexAction } from '../../state/movies/actions'
import { selectCurrentGenre } from '../../state/movies/selectors'
import useWebSocket from '../../hooks/useWebSocket'

const CreatedRoom = ({ navigation }) => {
  const [roomId, setRoomId] = useState('')
  const hashids = new Hashids()
  const dispatch = useDispatch()
  const [roomError, setRoomError] = useState('')
  const [userNameError, setUserNameError] = useState('')
  const [userName, setUserName] = useState('')
  const currentGenre = useSelector(selectCurrentGenre)

  const handleEnterRoom = () => {
    if (!userName) {
      setUserNameError('Please enter a name to continue')
    }
    if (!roomId) {
      setRoomError('Please enter a Room ID')
    }
    if (userName && roomId) {
      joinRoom(roomId, userName)
      dispatch(movieListIndexAction(currentGenre, true))
      navigation.navigate(STREAMING_SERVICES_SCREEN)
    }
  }

  const { joinRoom } = useWebSocket()

  const handleGenerateRoom = () => {
    // generating random roomId using date of the month and random number
    const date = new Date().getDate()
    const randomNumber = Math.floor(Math.random() * 1000)
    const roomId = hashids.encode(date, randomNumber).toUpperCase()

    // initializing a new room in database
    // pushing roomId to database
    // roomKey is uid of the room
    setRoomId(roomId)
  }

  return (
    <View style={styles.container}>
      <View style={styles.roomContainer}>
        <View style={styles.copyButtonContainer}>
          <Text style={styles.roomText}>Room ID</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => Clipboard.setString(roomId)}
          >
            <Image
              style={styles.copyButtonImage}
              source={require('../../../assets/copyButton.svg')}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.roomInputText}
          value={roomId}
          onChangeText={(text) => setRoomId(text.toUpperCase())}
        />
        <Text style={styles.error}>{roomError}</Text>
        <View style={styles.generateContainer}>
          <Text>Want to create a room? </Text>
          <Text style={styles.generateRoomText} onPress={handleGenerateRoom}>
            Generate Room ID
          </Text>
        </View>
      </View>
      <View style={styles.roomContainer}>
        <Text style={styles.roomText}>Your Name</Text>
        <TextInput
          style={styles.roomInputText}
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
        />
        <Text style={styles.error}>{userNameError}</Text>
      </View>
      <View style={styles.enterButtonContainer}>
        <TouchableOpacity
          style={styles.enterButton}
          onPress={() => handleEnterRoom()}
        >
          <Text style={styles.enterButtonText}>Enter Room</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  error: {
    color: 'red',
  },
  roomContainer: {
    width: '100%',
    marginBottom: 50,
  },
  roomText: {
    alignSelf: 'flex-start',
    marginRight: 3,
    fontSize: 28,
    flex: 1,
  },
  roomInputText: {
    flex: 1,
    minHeight: 70,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: baseStyles.BUTTON_COLOR,
    padding: 10,
    textAlign: 'center',
    fontSize: 28,
  },
  generateRoomText: {
    color: baseStyles.BUTTON_COLOR,
  },
  generateContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  enterButton: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    backgroundColor: baseStyles.BUTTON_COLOR,
  },
  enterButtonContainer: {
    width: '100%',
  },
  enterButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR,
  },
  copyButtonImage: {
    height: 24,
    width: 24,
  },
  copyButtonContainer: {
    flexDirection: 'row',
  },
  copyButton: {
    justifyContent: 'center',
  },
})

export default CreatedRoom
