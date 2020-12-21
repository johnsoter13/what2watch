import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  View,
  Button,
  Text,
  StatusBar,
} from 'react-native';
import {
  STREAMING_SERVICES_SCREEN,
  SEARCH_MOVIE_SCREEN,
  LOGIN,
} from '../../constants/ROUTES';
import {
  selectUserDisliked,
  selectUserId,
  selectUserIsLoggedIn,
} from '../../state/auth/selectors';
import { selectSearchResults } from '../../state/search/selectors';
import fetchUserDatabase from '../../lib/sdk';

const DislikedList = ({ navigation }) => {
  const dispatch = useDispatch();
  const disliked = useSelector(selectUserDisliked);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  const DATA = {};
  const values = [];
  const getDisliked = () => {
    if (isLoggedIn) {
      for (const [key, value] of Object.entries(disliked)) {
        values.push(value);
      }
    }
    console.log(values);
  };

  useEffect(() => {
    getDisliked();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={values}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default DislikedList;
