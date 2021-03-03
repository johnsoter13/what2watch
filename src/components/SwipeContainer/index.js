import React, { useEffect, useState } from 'react';

import {
  View,
  Dimensions,
  StyleSheet,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  movieListIndexAction,
  saveMovieAction,
} from '../../state/movies/actions';
import { movieMatchAction } from '../../state/rooms/actions';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const SwipeContainer = ({ genre, movie, components }) => {
  const dispatch = useDispatch();

  const handleRightSwipe = () => {
    dispatch(saveMovieAction(genre, true, movie));
    dispatch(movieListIndexAction(genre));
    dispatch(movieMatchAction(movie.movieId, true));
  };

  const handleLeftSwipe = () => {
    dispatch(saveMovieAction(genre, false, movie));
    dispatch(movieListIndexAction(genre));
  };

  const [position] = useState(new Animated.ValueXY());
  const [panResponder] = useState(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        if (gestureState.dx > SWIPE_THRESHOLD) {
          console.log('swipe right');
          forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          console.log('swipe left');
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    })
  );

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }, [movie, genre]);

  const getCardStyle = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }],
      height: 600,
    };
  };

  const onSwipeComplete = (direction) => {
    position.setValue({ x: 0, y: 0 });
    direction === 'right' ? handleRightSwipe() : handleLeftSwipe();
  };

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  return (
    <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
      {components}
    </Animated.View>
  );
};

export default SwipeContainer;
