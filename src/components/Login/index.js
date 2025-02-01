import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import { HOME_SCREEN } from '../../constants/ROUTES'
import { createUserAction, loginUserAction } from '../../state/auth/actions'
import { selectUserIsLoggedIn } from '../../state/auth/selectors'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const isUserLoggedIn = useSelector(selectUserIsLoggedIn)

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSignup = () => {
  //   dispatch(createUserAction(email, password));
  // };

  const handleLogin = () => {
    dispatch(loginUserAction())
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      navigation.navigate(HOME_SCREEN)
    }
  }, [isUserLoggedIn])

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_CLIENT_ID, // Replace with your client ID
    })
  }, [])

  return (
    <View>
      {/* <View style={styles.actionField}>
        <TextInput
          style={StyleSheet.TextInput}
          placeholder='Email'
          placeholderTextColor='#003f5c'
          onChangeText={(emailText) => setEmail(emailText)}
          keyboardType='email-address'
          autoCorrect={false}
        />
      </View>
      <View style={styles.actionField}>
        <TextInput
          style={StyleSheet.TextInput}
          placeholder='Password'
          placeholderTextColor='#003f5c'
          secureTextEntry
          onChangeText={(passwordText) => setPassword(passwordText)}
        />
      </View> */}
      {/* <View style={styles.actionButton}>
        <Button onPress={handleSignup} title='Create Account' />
      </View> */}
      <View style={styles.actionButton}>
        <Button onPress={handleLogin} title='Sign in with GOogle' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  actionField: {
    borderRadius: 30,
    width: '80%',
    height: 45,
    marginTop: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  actionsButton: {
    width: '100%',
    marginTop: 20,
  },
  forgotButton: {
    height: 30,
    marginBottom: 30,
  },
})

export default Login
