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

const CreatedRoom = ({ navigation }) => {
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
    <View>
      <Text>Room ID:</Text>
      <TextInput value={text} onChangeText={(text) => setText(text)} />
      <Text>Name:</Text>
      <TextInput
        value={userName}
        onChangeText={(userName) => setUserName(userName)}
      />
      <View>
        <TouchableOpacity onPress={() => handleEnterRoom()}>
          <Text>Enter Room</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleGenerateRoom()}>
          <Text>Generate Room ID</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});

export default CreatedRoom;
