import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Animated,
  PanResponder,
  LayoutAnimation,
  UIManager,
} from 'react-native';

import { LEFT_SWIPE, RIGHT_SWIPE } from '../MovieList/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const SwipeContainer = ({ handleRightSwipe, handleLeftSwipe, components }) => {
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
          forceSwipe(RIGHT_SWIPE);
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe(LEFT_SWIPE);
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
  });

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
    direction === RIGHT_SWIPE ? handleRightSwipe() : handleLeftSwipe();
  };

  const forceSwipe = (direction) => {
    const x = direction === RIGHT_SWIPE ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={getCardStyle()} {...panResponder.panHandlers}>
      {components}
    </Animated.View>
  );
};

export default SwipeContainer;
