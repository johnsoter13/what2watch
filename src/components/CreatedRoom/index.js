import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';

import {
  setMatchedMovieIdAction,
  updateRoomAction,
  updateRoomSize,
} from '../../state/rooms/actions';
import { STREAMING_SERVICES_SCREEN } from '../../constants/ROUTES';
import Hashids from 'hashids';
import { db } from '../../../config/Firebase';
import * as baseStyles from '../../styles/styles';
import {
  selectRoomUserID,
  selectUserName,
  selectRoomID,
} from '../../state/rooms/selectors';
import { openModalAction } from '../../state/modal/actions';
import MovieMatchModal from '../../components/Modals/MovieMatchModal';
import { movieListIndexAction } from '../../state/movies/actions';
import { selectCurrentGenre } from '../../state/movies/selectors';

const CreatedRoom = ({ navigation }) => {
  // change "text" to room related name
  const [text, setText] = useState('');
  const hashids = new Hashids();
  const roomRef = db.ref('rooms');
  const dispatch = useDispatch();
  const [roomError, setRoomError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [userName, setUserName] = useState('');
  const stateUserName = useSelector(selectUserName);
  const stateRoomID = useSelector(selectRoomID);
  const currentGenre = useSelector(selectCurrentGenre);

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
      dispatch(movieListIndexAction(currentGenre, true));
      // todo
      // remove listeners if roomKey exists in store

      findRoom();
    }
  };

  // check if there is a room with given room code
  const findRoom = () => {
    db.ref('rooms')
      .orderByChild('roomID')
      .equalTo(text)
      .once('value', function (snapshot) {
        if (snapshot.val()) {
          const roomKey = Object.keys(snapshot.val())[0];
          // Room exists, check if name is already used
          doesNameExist(roomKey);
        } else {
          setRoomError('No room was found by that ID');
        }
      });
  };

  // checks if name exists in roomKey
  const doesNameExist = (roomKey) => {
    db.ref('rooms/' + roomKey + '/users')
      .orderByChild('userName')
      .equalTo(userName)
      .once('value', function (snapshot) {
        let rejoin = false;
        if (snapshot.exists()) {
          // name exists
          // console.log('NAME ALREADY EXIST IN ROOM');
          // setUserNameError('Name already exists');
          rejoin = true;
        }
        const roomID = text;
        let roomSize = 1;
        joinRoom(roomKey, roomID, roomSize, rejoin);
      });
  };

  // join room with roomKey
  const joinRoom = (roomKey, roomID, roomSize, rejoin) => {
    db.ref('rooms/' + roomKey + '/roomSize').transaction(function (
      current_size
    ) {
      // if no one is in the room, initialize by removing users
      // then adding first user
      let usersRef = db.ref('rooms/' + roomKey + '/users');
      if (current_size === 0) {
        usersRef.remove().then(function () {
          usersRef.push({ userName: userName });
        });
      } else if (!rejoin) {
        usersRef.push({ userName: userName });
      }

      // if rejoining, don't increment roomSize
      if (!rejoin) {
        roomSize = (current_size || 0) + 1;
      } else {
        roomSize = current_size;
      }

      checkRoomSize(roomKey);
      checkFound(roomKey);
      const randomNumber = Math.floor(Math.random() * 1000);
      const roomUserID = hashids.encode(randomNumber);

      // only update room state if name or roomID is changed
      if (stateUserName !== userName || stateRoomID !== roomID) {
        dispatch(updateRoomAction(roomID, roomKey, userName, roomUserID));
        dispatch(updateRoomSize(roomSize));

        // todo
        // send another dispatch with ref of both listeners?
      }
      navigation.navigate(STREAMING_SERVICES_SCREEN);
      return roomSize;
    });
  };

  // attaching listener on roomSize
  const checkRoomSize = (roomKey) => {
    db.ref('rooms/' + roomKey + '/roomSize').on('value', function (snapshot) {
      const changedSize = snapshot.val();
      dispatch(updateRoomSize(changedSize));
    });
  };

  // attaching listener on found
  const checkFound = (roomKey) => {
    db.ref('rooms/' + roomKey + '/found').on('value', function (snapshot) {
      const movieId = snapshot.val();
      if (movieId) {
        dispatch(setMatchedMovieIdAction(movieId));
      }
    });
  };

  const handleGenerateRoom = () => {
    // generating random roomID using date of the month and random number
    const date = new Date().getDate();
    const randomNumber = Math.floor(Math.random() * 1000);
    const roomID = hashids.encode(date, randomNumber).toUpperCase();

    // initializing a new room in database
    // pushing roomID to database
    // roomKey is uid of the room
    const newRoomRef = roomRef.push({
      roomID: roomID,
      roomSize: 0,
      found: false,
    });
    const roomKey = newRoomRef.key;
    setText(roomID);
  };

  return (
    <View style={styles.container}>
      <View style={styles.roomContainer}>
        <View style={styles.copyButtonContainer}>
          <Text style={styles.roomText}>Room ID</Text>
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => Clipboard.setString(text)}
          >
            <Image
              style={styles.copyButtonImage}
              source={require('../../../assets/copyButton.svg')}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.roomInputText}
          value={text}
          onChangeText={(text) => setText(text.toUpperCase())}
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
});

export default CreatedRoom;
