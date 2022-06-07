import firebaseDB from "../../server/db/index";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const SET_USER = "SET_USER";
const SET_USER_SPELL = "SET_USER_SPELL";
const DELETE_USER_SPELL = "DELETE_USER_SPELL";

export const setSpell = (spell) => {
  return { type: SET_USER_SPELL, spell };
};

export const deleteSpell = (spell) => {
  return { type: DELETE_USER_SPELL, spell };
};

export const setUser = (user) => {
  return { type: SET_USER, user };
};

export const putSpell = (spell, id) => {
  return async (dispatch) => {
    try {
      const ref = doc(firebaseDB, "users", id);
      console.log(ref);
      await updateDoc(ref, {
        spellList: arrayUnion(spell),
      });
      dispatch(setSpell(spell));
    } catch (error) {
      console.error(error);
    }
  };
};
export const removeSpell = (spell, id) => {
  return async (dispatch) => {
    try {
      const ref = doc(firebaseDB, "users", id);
      await updateDoc(ref, {
        spellList: arrayRemove(spell),
      });
      dispatch(deleteSpell(spell));
    } catch (error) {
      console.error(error);
    }
  };
};

export const signIntoFirebase = (email, password, username, history) => {
  return async (dispatch) => {
    try {
      const userCred = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      const findInfo = query(
        collection(firebaseDB, "users"),
        where("uid", "==", userCred.user.uid)
      );

      const querySnapshot = await getDocs(findInfo);
      querySnapshot.forEach((doc) => {
        userCred.user.info = doc.data();
      });

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
      const info = {
        uid: userCred.user.uid,
        spellList: [],
        preparedSpells: [],
      };
      await setDoc(doc(firebaseDB, "users", `${userCred.user.uid}`), info);
      userCred.user.info = info;
      history.push("/spells");
      dispatch(setUser(userCred.user));
    } catch (error) {
      console.error(error);
    }
  };
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_SPELL: {
      const filteredSpells = state.info.spellList.filter(
        (spell) => spell.name !== action.spell.name
      );
      return { ...state, info: { ...state.info, spellList: filteredSpells } };
    }
    case SET_USER_SPELL:
      return {
        ...state,
        info: {
          ...state.info,
          spellList: [...state.info.spellList, action.spell],
        },
      };
    case SET_USER:
      return (state = action.user);
    default:
      return state;
  }
};

export default userReducer;
