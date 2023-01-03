import { combineReducers } from "redux";
import { INCREMENT, DECREMENT, ASYNC, CHANGE_THEME, DISABLE_BUTTONS, ENABLE_BUTTONS } from "./actionNames";

export const counterActions = {
  increment: () => ({ type: INCREMENT }),
  decrement: () => ({ type: DECREMENT }),
  disableBtns: () => ({ type: DISABLE_BUTTONS }),
  enableBtns: () => ({ type: ENABLE_BUTTONS }),
  asyncIncrement: () => {
    // Async action. could be request to the server
    return function (dispatch) {
      const addBtn = document.getElementById("add");
      const subBtn = document.getElementById("sub");
      const themeBtn = document.getElementById("theme");

      addBtn.disabled = true;
      subBtn.disabled = true;
      themeBtn.disabled = true;

      new Promise((resolve, reject) => {
        return setTimeout(() => {
          resolve(dispatch({ type: ASYNC }));
        }, 2000);
      }).finally(() => {
        addBtn.disabled = false;
        subBtn.disabled = false;
        themeBtn.disabled = false;
      });
    };
  },
};

// State as a primitive.
export const counterReducer = (state = {counterValue: 0, areButtonsDisabled: false}, action) => {
  switch (action.type) {
    case INCREMENT:
      return {...state, counterValue: state.counterValue + 1};

    case DECREMENT:
      return {...state, counterValue: state.counterValue - 1};

    case ASYNC:
      return {...state, counterValue: 10};

    case DISABLE_BUTTONS:
      return {...state, areButtonsDisabled: false};

    case ENABLE_BUTTONS:
      return {...state, areButtonsDisabled: true};

    default:
      return state;
  }
};

export const themeActions = {
  changeTheme: (payloads) => ({ type: CHANGE_THEME, ...payloads }),
};

//State as an object.
const themeReducer = (state = {value: 'white'}, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, value: action.theme };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer
});

export const rootReducer2 = (reducersData) => {
  // reducers data - [{reducer: fn, reducerInitState: any}]
  reducersData.map(reducerObj => reducerObj.reducer(reducerObj.reducerInitState))
};
