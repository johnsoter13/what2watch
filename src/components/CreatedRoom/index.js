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
import { updateRoomIDRoomKeyAction } from '../../state/rooms/actions';
import { STREAMING_SERVICES_SCREEN } from '../../constants/ROUTES';
import Hashids from 'hashids';
import Firebase, { db } from '../../../config/Firebase';
import * as baseStyles from '../../styles/styles';

const CreatedRoom = ({navigation}) => {
  const [text, setText] = useState('');
  const hashids = new Hashids();
  const roomRef = db.ref('rooms');
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [userName, setUserName] = useState('');

  const handleEnterRoom = () => {
    if (!text) {
      setError('NO ROOM ID');
    } else if (!userName) {
      setError('NO NAME');
    } else {
      // check if RoomID exists
      roomRef
        .orderByChild('roomID')
        .equalTo(text)
        .on('value', function (snapshot) {
          if (snapshot.val()) {
            const roomID = text;
            const roomKey = Object.keys(snapshot.val())[0];
            dispatch(updateRoomIDRoomKeyAction(roomID, roomKey, userName));
            navigation.navigate(STREAMING_SERVICES_SCREEN);
          } else {
            console.log('NO ROOM WITH THAT ID');
            setError('NO ROOM OF THAT ID');
          }
        });
    }
  };

  const handleGenerateRoom = () => {
    console.log('handle generate room clicked');

    // generating random roomID using date of the month and random number
    const date = new Date().getDate();
    const randomNumber = Math.floor(Math.random() * 1000);
    const roomID = hashids.encode(date, randomNumber);

    // pushing roomID to database
    // roomKey is uid of the room
    const newRoomRef = roomRef.push({ roomID: roomID });
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
        <TextInput style={styles.roomInputText} value={text} onChangeText={(text) => setText(text)} />
        <View style={styles.generateContainer}>
          <Text>Want to create a room? </Text>
          <Text style={styles.generateRoomText}onPress={handleGenerateRoom}>Generate Room ID</Text>
        </View>
      </View>
      <View style={styles.roomContainer}>
        <Text style={styles.roomText}>Your Name:</Text>
        <TextInput
          style={styles.roomInputText}
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
        />

      </View>
      <View style={styles.enterButtonContainer}>
        <TouchableOpacity style={styles.enterButton} onPress={() => handleEnterRoom()}>
          <Text style={styles.enterButtonText}>Enter Room</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.error}>{error}</Text>
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
    fontSize: 28
  },
  generateRoomText: {
    color: baseStyles.BUTTON_COLOR,
  },
  generateContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  enterButton: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: baseStyles.BUTTON_BORDER_RADIUS,
    backgroundColor: baseStyles.BUTTON_COLOR,
  },
  enterButtonContainer: {
    width: '100%'
  },
  enterButtonText: {
    color: baseStyles.BUTTON_TEXT_COLOR
  }
});

export default CreatedRoom;
