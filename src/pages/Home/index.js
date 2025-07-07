import { Component } from "@components/core/Component";
import Header from "@components/layout/Header";
import TodoInput from "@pages/Home/view/TodoInput";
import TodoList from "@pages/Home/view/TodoList";
import TodoCloseList from "@pages/Home/view/TodoCloseList";
import { v, renderDom } from "@components/core/vdom";
import "./home.scss";

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

  makeTodoCloseList(parent) {
    const todoList = v(TodoCloseList, { className: "todo-close-list" });
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
    this.makeTodoCloseList(rightView);

    this.el.appendChild(contentView);
  }
}

export default Home;
