import { SUCCESS } from '../constants';
import { MOVIE_INDEX } from '../movies/constants';

import { UPDATE_STREAMING_SERVICES } from './constants';
import { saveToUserDatabase } from '../../lib/sdk';

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
    saveToUserDatabase(uid)
      .set(
        {
          streaming_services: streamingServices,
        },
        (error) => {
          if (error) {
            console.log('failed!' + error);
          }
        }
      )
      .then(() => console.log('Data saved!'));
  }
};
