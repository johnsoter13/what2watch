import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, View, Button } from "react-native";

import { STREAMING_SERVICES } from "./constants";

const StreamingServiceList = () => {
  const dispatch = useDispatch();
  const [selectedStreamingServices, setSelectedStreamingServices] = useState(
    []
  );

  const handleStreamingServiceSelection = (streamingService) => {
    if (
      selectedStreamingServices.some(
        (service) => service === streamingService.name
      )
    ) {
      setSelectedStreamingServices(
        selectedStreamingServices.filter(
          (service) => service !== streamingService.name
        )
      );
    } else {
      setSelectedStreamingServices([
        ...selectedStreamingServices,
        streamingService.name,
      ]);
    }
  };

  console.log(selectedStreamingServices);

  return Object.keys(STREAMING_SERVICES).map((streamingService) => (
    <View>
      <Button
        title={STREAMING_SERVICES[streamingService].name}
        onPress={() =>
          handleStreamingServiceSelection(STREAMING_SERVICES[streamingService])
        }
      />
    </View>
  ));
};

export default StreamingServiceList;
