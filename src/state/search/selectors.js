export const selectSearchResults = (state, query) =>
  state.search.moviesFromSearch[query];

// TODO: sort by recency
export const selectRecentSearchQueries = (state) =>
  Object.keys(state.search.moviesFromSearch);

export const selectSearchQuery = (state) => state.search.searchQuery;

export const selectSearchStatus = (state) => state.search.moviesFromSearchLoadingStatus;
