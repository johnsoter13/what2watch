import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Title, Text } from "react-native";

import { selectSearchResults } from "../../state/search/selectors";

const SearchMovieList = ({ query }) => {
  console.log(query);
  const searchMovies = useSelector((state) =>
    selectSearchResults(state, query)
  );

  return (
    <View>
      {searchMovies?.map((movie) => (
        <>
          <Text>{movie.name}</Text>
          <View>
            {movie.locations.map((streamingService) => (
              <Text>{streamingService.display_name}</Text>
            ))}
          </View>
        </>
      ))}
    </View>
  );
};

export default SearchMovieList;
