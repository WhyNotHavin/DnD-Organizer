import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import firebaseDB from "../../server/db/index";
const SET_USER = "SET_USER";

export const setUser = (user) => {
  return { type: SET_USER, user };
};
export const signIntoFirebase = (email, password, username, history) => {
  return async (dispatch) => {
    try {
      console.log("this ran");
      const userCred = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      history.push("/spells");
      dispatch(setUser(userCred.user));
    } catch (error) {
      console.log("this errored");
      console.error(error);
    }
  };
};

export const signUpFirebase = (email, password, username, history) => {
  return async (dispatch) => {
    try {
      let auth = getAuth();
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(auth.currentUser, {
        displayName: username,
      });
      history.push("/spells");
      dispatch(setUser(userCred.user));
    } catch (error) {
      console.error(error);
    }
  };
};
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return (state = action.user);
    default:
      return state;
  }
};

export default userReducer;
