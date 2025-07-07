import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import "./TodoList.scss";
import Button from "@components/ui/Button";
import todoStore from "@store/todoStore";
import TodoItem from "@pages/Home/TodoItem";
import TodoListHeader from "@pages/Home/TodoListHeader";

import { v, diff, renderDom } from "@components/core/vdom";
import CheckIcon from "@assets/images/check.svg";

class TodoList extends Component {
  createElement() {
    return document.createElement("div");
  }

  constructor(props) {
    super(props);
    this.oldVNode = null; // 이전 VDOM 저장용
  }

  closeBtnOnClick(id) {
    console.log("closeBtnOnClick", id);
    todoStore.state.todoList = todoStore.state.todoList.filter((todo) => todo.id !== id);

    console.log("result", todoStore.state.todoList);
  }

  renderItem() {
    const todos = todoStore.state.todoList;
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
    const listHeaderView = v(TodoListHeader, { className: "list-header-view" });

    this.listView = document.createElement("div");

    this.el.appendChild(renderDom(text));
    this.el.appendChild(renderDom(listHeaderView));

    this.listView.className = "todo-list-view";

    this.el.appendChild(this.listView);

    // 상태 연결
    todoStore.observe(() => this.renderItem());
    this.renderItem();
  }
}

export default TodoList;
