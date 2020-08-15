import { USERE_STREAMING_SERVICES } from "./constants";

export const updateUserStreamingServicesAction = (streamingServices) => (
  dispatch
) => {
  dispatch({
    type: USERE_STREAMING_SERVICES,
    payload: streamingServices,
  });
};
