import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import "./TodoList.scss";
import todoStore from "@store/todoStore";
import TodoCloseItem from "@pages/Home/view/item/TodoCloseItem";

import { v, diff, renderDom } from "@components/core/vdom";

class TodoCloseList extends Component {
  createElement() {
    return document.createElement("div");
  }

  constructor(props) {
    super(props);
    this.oldVNode = null; // 이전 VDOM 저장용
  }

  resetBtnOnClick(id) {
    console.log("resetBtnOnClick", id);

    const resetItem = todoStore.state.todoCloseList.filter((todo) => todo.id === id);

    todoStore.state.todoCloseList = todoStore.state.todoCloseList.filter((todo) => todo.id !== id);

    const newList = [...todoStore.state.todoList, ...resetItem].map((item) => ({ ...item, isChecked: false }));
    todoStore.state.todoList = newList;

    if (todoStore.state.sortType === "inputOrder") {
      const todos = todoStore.state.sortInputOrderFn({ ...todoStore.state, todoList: newList });

      setTimeout(() => {
        todoStore.state.todoList = [...todos];
      });
    } else {
      const todos = todoStore.state.sortRemainingTimeOrderFn({ ...todoStore.state, todoList: newList });

      setTimeout(() => {
        todoStore.state.todoList = [...todos];
      });
    }
  }

  renderItem() {
    const todos = todoStore.state.todoCloseList;

    console.log("close??", todos);
    const childrenVNode = todos.map((todo) =>
      v(TodoCloseItem, {
        ...todo,
        key: todo.id,
        className: "todo-close-item",
        resetBtnOnClick: this.resetBtnOnClick,
      })
    );

    const newVNode = {
      type: "fragment",
      children: childrenVNode,
    };

    // 초기 렌더일 경우
    if (!this.oldVNode) {
      childrenVNode.map(renderDom).forEach((child) => {
        this.listView.appendChild(child);
      });
    } else {
      // diff만 수행 (listView 내부만 변경)
      diff(this.listView, this.oldVNode, newVNode);
    }

    this.oldVNode = newVNode;
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const text = v(Text, { as: "h2", text: "종료된 할 일" });

    this.listView = document.createElement("div");

    this.el.appendChild(renderDom(text));

    this.listView.className = "todo-list-view";

    this.el.appendChild(this.listView);

    // 상태 연결
    todoStore.observe(() => this.renderItem());
    this.renderItem();
  }
}

export default TodoCloseList;
