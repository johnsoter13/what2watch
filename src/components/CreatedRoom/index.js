import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { updateRoomAction, updateRoomSize } from '../../state/rooms/actions';
import { STREAMING_SERVICES_SCREEN } from '../../constants/ROUTES';
import Hashids from 'hashids';
import Firebase, { db } from '../../../config/Firebase';
import * as baseStyles from '../../styles/styles';
import {
  selectRoomUserID,
  selectUserName,
  selectRoomID,
} from '../../state/rooms/selectors';
import { openModalAction } from '../../state/modal/actions';
import MovieMatchModal from '../../components/Modals/MovieMatchModal';

const CreatedRoom = ({ navigation }) => {
  const [text, setText] = useState('');
  const hashids = new Hashids();
  const roomRef = db.ref('rooms');
  const dispatch = useDispatch();
  const [roomError, setRoomError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userName, setUserName] = useState('');
  const stateUserName = useSelector(selectUserName);
  const stateRoomID = useSelector(selectRoomID);

  const handleEnterRoom = () => {
    if (!userName) {
      setUserNameError('Please enter a name to continue');
    }
    if (!text) {
      setRoomError('Please enter a Room ID');
    }
    if (userName && text) {
      setUserNameError('');
      setRoomError('');
      // check if RoomID exists
      roomRef
        .orderByChild('roomID')
        .equalTo(text)
        .once('value', function (snapshot) {
          if (snapshot.val()) {
            const roomID = text;
            const roomKey = Object.keys(snapshot.val())[0];
            let roomSize = 1;

            db.ref('rooms/' + roomKey + '/roomSize').transaction(function (
              current_size
            ) {
              roomSize = (current_size || 0) + 1;
              checkRoomSize(roomKey);
              checkFound(roomKey);
              const randomNumber = Math.floor(Math.random() * 1000);
              const roomUserID = hashids.encode(randomNumber);
              console.log(roomUserID);

              // only update room state if name or roomID is changed
              if (stateUserName !== userName || stateRoomID !== roomID) {
                dispatch(
                  updateRoomAction(roomID, roomKey, userName, roomUserID)
                );
                dispatch(updateRoomSize(roomSize));
              }
              // console.log('about to navigate to streaming services');
              navigation.navigate(STREAMING_SERVICES_SCREEN);
              return roomSize;
            });
          } else {
            console.log('NO ROOM WITH THAT ID');
            setRoomError('No room was found by that ID');
          }
        });
    }
  };

  // attaching listener on roomSize
  const checkRoomSize = (roomKey) => {
    db.ref('rooms/' + roomKey + '/roomSize').on('value', function (snapshot) {
      const changedSize = snapshot.val();
      console.log('Room Size is now: ' + changedSize);
      dispatch(updateRoomSize(changedSize));
    });
  };

  const checkFound = (roomKey) => {
    db.ref('rooms/' + roomKey + '/found').on('value', function (snapshot) {
      const movieId = snapshot.val();
      console.log('Found?: ' + movieId);
      if (movieId) {
        dispatch(openModalAction(<MovieMatchModal movieId={movieId} />));
      }
    });
  };

  // attaching listener on found

  const handleGenerateRoom = () => {
    console.log('handle generate room clicked');

    // generating random roomID using date of the month and random number
    const date = new Date().getDate();
    const randomNumber = Math.floor(Math.random() * 1000);
    const roomID = hashids.encode(date, randomNumber);

    // initializing a new room in database
    // pushing roomID to database
    // roomKey is uid of the room
    const newRoomRef = roomRef.push({
      roomID: roomID,
      roomSize: 0,
      found: false,
    });
    const roomKey = newRoomRef.key;

    console.log('Key in the database: ' + roomKey);
    console.log('Room ID: ' + roomID);
    setText(roomID);

    // need to store roomkey in the store
  };

  return (
    <View style={styles.container}>
      <View style={styles.roomContainer}>
        <Text style={styles.roomText}>Room ID:</Text>
        <TextInput
          style={styles.roomInputText}
          value={text}
          onChangeText={(text) => setText(text)}
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
        <Text style={styles.roomText}>Your Name:</Text>
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
  );
};

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
    alignSelf: 'center',
    marginRight: 3,
    fontSize: 28,
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
});

export default CreatedRoom;
