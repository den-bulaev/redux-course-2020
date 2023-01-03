import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { counterActions, rootReducer, themeActions } from "./redux/reducer";
import "./styles.css";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

// custom middleware
// function logger(state) {
//   return function(next) {
//     return function(action) {
//       console.log('Prev State', state.getState());
//       console.log('Action', action);

//       return next(action);
//     }
//   }
// }

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

store.subscribe(() => {
  const state = store.getState();

  if (counter) {
    counter.textContent = state.counter.counterValue;
  }

  document.body.className = state.theme.value;
  [addBtn, subBtn, asyncBtn, themeBtn].forEach(btn => btn.disabled = state.counter.areButtonsDisabled);
});

store.dispatch({ type: "INIT_APP_STATE" });

if (addBtn) {
  addBtn.addEventListener("click", () => {
    store.dispatch(counterActions.increment());
  });
}

if (subBtn) {
  subBtn.addEventListener("click", () => {
    store.dispatch(counterActions.decrement());
  });
}

if (asyncBtn) {
  asyncBtn.addEventListener("click", () => {
    store.dispatch(counterActions.asyncIncrement(store.dispatch));
  });
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const payloads = {
      theme: document.body.classList.contains('white') ? 'dark' : 'white',
    };
    store.dispatch(themeActions.changeTheme(payloads));
  });
}
