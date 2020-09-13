import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button } from "react-native";
import { cloneDeep } from "lodash";

import { updateStreamingServicesAction } from "../../state/streaming/actions";
import { selectUserStreamingServices } from "../../state/streaming/selectors";
import { HOME_SCREEN } from "../../constants/ROUTES";

import { STREAMING_SERVICES } from "./constants";

const StreamingServiceList = ({ navigation }) => {
  const dispatch = useDispatch();
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const [selectedStreamingServices, setSelectedStreamingServices] = useState(
    userStreamingServices
  );

  const saveStreamingServices = () => {
    dispatch(updateStreamingServicesAction(selectedStreamingServices));
    navigation.navigate(HOME_SCREEN);
  };

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
        <View>
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

export default StreamingServiceList;
