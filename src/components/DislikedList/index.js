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
import { SET_DISLIKED } from '../../state/auth/constants';
import { updateDislikedAction } from '../../state/auth/actions';

const DislikedList = ({ navigation }) => {
  const dispatch = useDispatch();
  const disliked = useSelector(selectUserDisliked);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const uid = useSelector(selectUserId);

  const getDisliked = () => {
    if (isLoggedIn) {
      updateDislikedAction(uid);
    }
    console.log(disliked);
  };

  useEffect(() => {
    getDisliked();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={disliked}
        renderItem={({ item }) => (
          <Text style={styles.item} key={item}>
            {item}
          </Text>
        )}
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
