import { addDoc, collection, getDocs } from "firebase/firestore";
import firebaseDB from "../../server/db/index";

const SET_SPELLS = "SET_SPELLS";

const SET_SPELL = "SET_SPELL";

export const setSpells = (spells) => {
  return { type: SET_SPELLS, spells };
};
export const setSpell = (spell) => {
  return { type: SET_SPELL, spell };
};

export const fetchFirebaseData = () => {
  return async (dispatch) => {
    const querySnapshot = await getDocs(collection(firebaseDB, "spell"));
    const arr = [];
    querySnapshot.forEach(async (doc) => {
      const spell = doc.data();
      arr.push(spell);
    });
    console.log(arr);
    dispatch(setSpells(arr));
  };
};

export const postFirebaseSpell = (newSpell, history) => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(collection(firebaseDB, "spell"));
      let alreadyHave = false;
      querySnapshot.forEach(async (doc) => {
        const spell = doc.data();
        if (spell.name === newSpell.name) {
          alreadyHave = true;
        }
      });
      if (alreadyHave) {
        throw Error;
      } else {
        await addDoc(collection(firebaseDB, "spell"), newSpell);
        history.push("/spells");
        dispatch(setSpell(newSpell));
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
};

export const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_SPELL:
      return [...state, action.spell];
    case SET_SPELLS:
      return [...action.spells];
    default:
      return state;
  }
};

export default reducer;
