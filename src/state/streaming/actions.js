import { SUCCESS } from '../constants';
import { MOVIE_INDEX } from '../movies/constants';

import { UPDATE_STREAMING_SERVICES } from './constants';
import { fetchUserDatabase } from '../../lib/sdk';

export const updateStreamingServicesAction = (
  streamingServices,
  isLoggedIn = false,
  uid = ''
) => (dispatch) => {
  dispatch({
    type: UPDATE_STREAMING_SERVICES,
    status: SUCCESS,
    payload: { streamingServices },
  });

  dispatch({
    type: MOVIE_INDEX,
    status: SUCCESS,
    payload: { reset: true },
  });

  if (isLoggedIn) {
    fetchUserDatabase(uid)
      .set(
        {
          streaming_services: streamingServices,
        },
        (error) => {
          if (error) {
            console.log('failed! ' + error);
          }
        }
      )
      .then(() => console.log('Streaming Servies saved!'));
  }
};
