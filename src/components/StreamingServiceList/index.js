import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button, Alert } from "react-native";
import { cloneDeep } from "lodash";

import { updateStreamingServicesAction } from "../../state/streaming/actions";
import { selectUserStreamingServices } from "../../state/streaming/selectors";
import { GENRE_SCREEN } from "../../constants/ROUTES";

import { STREAMING_SERVICES } from "./constants";

const StreamingServiceList = ({ navigation }) => {
  const dispatch = useDispatch();
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const [selectedStreamingServices, setSelectedStreamingServices] = useState(
    userStreamingServices
  );

  const saveStreamingServices = () => {
    if (Object.keys(selectedStreamingServices).length != 0) {
      dispatch(updateStreamingServicesAction(selectedStreamingServices));
      navigation.navigate(GENRE_SCREEN);
    } else {
      console.log("SELECT SOMETHIGN");
    }
  };

  const noStreamingServiceAlert = () => {
    Alert.alert(
      "Oops!",
      "You have to select at least one streaming service.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel"
        },
        {
          text: "Okay",
          onPress: () => console.log("Okay pressed"),
          style: "default"
        }
      ],
      { cancelable: false }
    );
  }

  const handleStreamingServiceSelection = (streamingService) => {
    if (selectedStreamingServices[streamingService]) {
      const stateCopy = cloneDeep(selectedStreamingServices);

      delete stateCopy[streamingService];
      setSelectedStreamingServices(stateCopy);
    } else {
      setSelectedStreamingServices({
        ...selectedStreamingServices,
        [streamingService]: STREAMING_SERVICES[streamingService],
      });
    }
  };
  return (
    <View>
      {Object.keys(STREAMING_SERVICES).map((streamingService) => (
        <View key={streamingService}
              style={styles.highlightsButton}>
          <Button
            color={
              selectedStreamingServices[streamingService]
                ? "#008000"
                : "#FF0000"
            }
            title={STREAMING_SERVICES[streamingService].displayName}
            onPress={() => handleStreamingServiceSelection(streamingService)}
          />
        </View>
      ))}
      <Button title="Submit" onPress={saveStreamingServices} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  highlightsButton: {
    
  },
});

export default StreamingServiceList;
