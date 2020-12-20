import { SUCCESS } from "../constants";
import { MOVIE_INDEX } from "../movies/constants";

import { UPDATE_STREAMING_SERVICES } from "./constants";

export const updateStreamingServicesAction = (streamingServices) => (
  dispatch
) => {
  dispatch({
    type: UPDATE_STREAMING_SERVICES,
    status: SUCCESS,
    payload: { streamingServices },
  });

  dispatch({
    type: MOVIE_INDEX,
    status: SUCCESS,
    payload: {reset: true},
  })
};
