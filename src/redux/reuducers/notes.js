const initState = {
  items: [],
};

export default function notes(state = initState, action) {
  if (action.type === "SET_NOTE") {
    return {
      items: [...state.items, action.playload],
    };
  }

  return state;
}
