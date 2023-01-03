export const createStore = (reducer, initialState) => {
  let state = reducer(initialState, {type: '__INIT__'});
  const subscribers = [];

  return {
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach(subscribe => subscribe());
    },
    subscribe(callback) {
      subscribers.push(callback);
    },
    getState() {
      return state;
    }
  };
};
