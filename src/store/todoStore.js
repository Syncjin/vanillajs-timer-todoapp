import Store from "@store/store.js";

function sortRemainingTimeOrderFn(state) {
  console.log("sortRemainingTimeOrderFn", state);

  const todos = [...state.todoList];
  const now = Date.now();

  todos.sort((a, b) => {
    const remainA = Math.max(0, Number(a.time * 1000) - (now - a.regDate));
    const remainB = Math.max(0, Number(b.time * 1000) - (now - b.regDate));
    return remainA - remainB;
  });
  return todos;
}

function sortInputOrderFn(state) {
  const todos = [...state.todoList];
  todos.sort((a, b) => a.regDate - b.regDate);
  return todos;
}

const todoStore = new Store({
  todoList: [],
  todoCloseList: [],
  sortType: "inputOrder",
  sortRemainingTimeOrderFn,
  sortInputOrderFn,
});

export default todoStore;
