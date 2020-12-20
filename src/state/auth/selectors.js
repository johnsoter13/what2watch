export const selectUserIsLoggedIn = (state) => state.auth.user.isLoggedIn;

export const selectUserId = (state) => state.auth.user.uid;

export const selectUserIdToken = (state) => state.auth.user.idToken;
