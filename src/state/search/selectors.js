export const selectSearchResults = (state, query) =>
  state.search.moviesFromSearch[query];
