import React, { useRef, useEffect } from 'react';
import { Animated, Image, View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { setMatchAnimationAction } from '../../state/animation/actions';
import * as baseStyles from '../../styles/styles'

const MatchAnimationView = ({moviePicture}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const dispatch = useDispatch();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true
        }
      ),
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }
      ),
    ]).start(({ finished }) => {
      dispatch(setMatchAnimationAction(finished))
    })
  }, [fadeAnim])

  return (
    <View className='animated-view-container' style={styles.animatedViewContainer}>
      <Animated.View           
        className='animated-view-image-container'
        style={{width: '100%', height: '100%', opacity: fadeAnim}}
      >
        <Image source={{uri: moviePicture}} style={styles.movieImage} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  animatedViewContainer: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
  movieImage: {
    width: '100%', 
    height: '100%',
  }
});

// You can then use your `MatchAnimationView` in place of a `View` in your components:
export default MatchAnimationView;