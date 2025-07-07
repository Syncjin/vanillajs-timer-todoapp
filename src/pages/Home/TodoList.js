import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import "./TodoList.scss";
import Button from "@components/ui/Button";
import todoStore from "@store/todoStore";
import TodoItem from "@pages/Home/TodoItem";
import { v, diff, renderDom } from "@components/core/vdom";

class TodoList extends Component {
  createElement() {
    return document.createElement("div");
  }

  constructor(props) {
    super(props);
    this.oldVNode = null; // 이전 VDOM 저장용
  }

  sortInputOrderOnClick() {
    console.log("sortInputOrderOnClick", todoStore.state.todoList);

    const todos = [...todoStore.state.todoList];
    todos.sort((a, b) => a.regDate - b.regDate);

    console.log("입력한순", todos);
    todoStore.state.todoList = [...todos];
  }

  sortRemainingTimeOrderOnClick() {
    console.log("sortRemainingTimeOrderOnClick", todoStore.state.todoList);

    const todos = [...todoStore.state.todoList];
    const now = Date.now();
    todos.sort((a, b) => {
      const remainA = Math.max(0, Number(a.time * 1000) - (now - a.regDate));
      const remainB = Math.max(0, Number(b.time * 1000) - (now - b.regDate));
      return remainA - remainB;
    });

    todoStore.state.todoList = [...todos];
  }

  closeBtnOnClick(id) {
    console.log("closeBtnOnClick", id);
    todoStore.state.todoList = todoStore.state.todoList.filter((todo) => todo.id !== id);

    console.log("result", todoStore.state.todoList);
  }

  renderItem() {
    const todos = todoStore.state.todoList;
    console.log("render? todos", todos);
    const childrenVNode = todos.map((todo) =>
      v(TodoItem, {
        ...todo,
        key: todo.id,
        className: "todo-item",
        closeBtnOnClick: this.closeBtnOnClick,
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
    const text = v(Text, { as: "h2", text: "할 일 목록" });

    const listHeaderView = document.createElement("div");
    const sortView = document.createElement("div");
    const closeView = document.createElement("div");
    listHeaderView.className = "list-header-view";
    sortView.className = "sort-view";
    closeView.className = "close-view";

    const sortInputOrderBtn = v(Button, { label: "입력한 순", onClick: this.sortInputOrderOnClick });
    const sortRemainingTimeOrderBtn = v(Button, { label: "남은 시간 순", onClick: this.sortRemainingTimeOrderOnClick });
    const allCloseBtn = v(Button, { label: "전체 종료", className: "close-btn", onClick: () => {} });
    const closeBtn = v(Button, { label: "선택 종료", className: "close-btn", onClick: () => {} });

    sortView.appendChild(renderDom(sortInputOrderBtn));
    sortView.appendChild(renderDom(sortRemainingTimeOrderBtn));
    closeView.appendChild(renderDom(allCloseBtn));
    closeView.appendChild(renderDom(closeBtn));

    listHeaderView.appendChild(sortView);
    listHeaderView.appendChild(closeView);

    this.listView = document.createElement("div");

    this.el.appendChild(renderDom(text));
    this.el.appendChild(listHeaderView);

    this.listView.className = "todo-list-view";

    this.el.appendChild(this.listView);

    // 상태 연결
    todoStore.observe(() => this.renderItem());
    this.renderItem();
  }
}

export default TodoList;
