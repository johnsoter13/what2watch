import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Title, Text } from "react-native";

import { selectMovieIndex, selectMovieStreamingServicesByGenre, selectMoviesByGenre, selectMoviesByGenreLoadingStatus} from "../../state/movies/selectors";
import { selectUserStreamingServices } from "../../state/streaming/selectors";
import SwipeMovieCard from "../SwipeMovieCard";
import { SUCCESS } from "../../state/constants";
import {movieListIndexAction, fetchMovieStreamingServicesAction} from '../../state/movies/actions';

const MovieList = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const movieIndex = useSelector(selectMovieIndex);
  const moviesByGenre = useSelector((state) => selectMoviesByGenre(state, route.params.genre));
  const userStreamingServices = useSelector(selectUserStreamingServices);
  const moviesByGenreLoadingStatus = useSelector(selectMoviesByGenreLoadingStatus);

  return (
    <View>
      {moviesByGenreLoadingStatus === SUCCESS && moviesByGenre &&
        <SwipeMovieCard userStreamingServices={userStreamingServices} movieId={moviesByGenre[movieIndex]} />
      }
    </View>
  );
};

export default MovieList;
