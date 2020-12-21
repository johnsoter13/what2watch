import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';

const areEqual = (prevProps, nextProps) =>
  prevProps.loadingComplete === nextProps.loadingComplete;

const Loading = ({ loadingComplete }) => {
  return (
    !loadingComplete && (
      <ActivityIndicator style={styles.loading} size='large' />
    )
  );
};

export default React.memo(Loading, areEqual);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },
});
