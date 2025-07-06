import { Component } from "@components/core/Component";
import Header from "@components/layout/Header";
import TodoInput from "@pages/Home/TodoInput";
import TodoList from "@pages/Home/TodoList";
import { v, renderDom } from "@components/core/vdom";

class Home extends Component {
  createElement() {
    const div = document.createElement("div");
    div.className = "home-page";
    return div;
  }

  makeTodoInput(parent) {
    const todoInput = v(TodoInput, { className: "todo-input" });

    parent.appendChild(renderDom(todoInput));
  }

  makeTodoList(parent) {
    const todoList = v(TodoList, { className: "todo-list" });
    parent.appendChild(renderDom(todoList));
  }

  render() {
    /** 레이아웃 생성 */
    const header = v(Header, { className: "header" });
    this.el.appendChild(renderDom(header));

    const contentView = document.createElement("div");
    contentView.className = "content-view";

    const leftView = document.createElement("div");
    leftView.className = "left-view";

    const rightView = document.createElement("div");
    rightView.className = "right-view";

    contentView.appendChild(leftView);
    contentView.appendChild(rightView);

    this.makeTodoInput(leftView);
    this.makeTodoList(leftView);

    this.el.appendChild(contentView);
  }
}

export default Home;
