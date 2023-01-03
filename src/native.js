import { createStore } from "./createStore";
import { counterActions, counterReducer } from "./redux/reducer";
import "./styles.css";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");

// works only with state as a primitive
const store = createStore(counterReducer, 0);

store.subscribe(() => console.log(store.getState()));
store.subscribe(() => {
  const state = store.getState();

  if (counter) {
    counter.textContent = state;
  }
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
