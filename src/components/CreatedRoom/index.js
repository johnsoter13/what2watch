
import React, {useState} from 'react'
import { StyleSheet, View, Button, TouchableOpacity, Text, TextInput } from 'react-native';


const CreatedRoom = () => {
  const [text, setText] = useState('');

  const handleEnterRoom = () => {
    console.log('handle enter clicked');
  }

  const handleGenerateRoom = () => {
    console.log('handle generate room clicked');
  }

  return (
  <View>
    <Text>
      Room ID:
    </Text>
    <TextInput
      value={text}
      onChangeText={(text) => setText(text)}
    />
    <View>
      <TouchableOpacity
       onPress={() => handleEnterRoom()}>
        <Text>
          Enter Room
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleGenerateRoom()}>
        <Text>
          Generate Room ID
        </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default CreatedRoom;