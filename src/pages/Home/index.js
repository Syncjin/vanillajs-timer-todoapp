import { Component } from "@components/common/Component";
import Header from "@components/layout/Header";
import TodoInput from "@pages/Home/TodoInput";
import TodoList from "@pages/Home/TodoList";

class Home extends Component {
  createElement() {
    const div = document.createElement("div");
    div.className = "home-page";
    return div;
  }

  makeTodoInput(parent) {
    const todoInput = new TodoInput({ className: "todo-input" });

    parent.appendChild(todoInput.el);
  }

  makeTodoList(parent) {
    const todoList = new TodoList({ className: "todo-list" });
    parent.appendChild(todoList.el);
  }

  render() {
    /** 레이아웃 생성 */
    const header = new Header({ className: "header" });
    this.el.appendChild(header.el);

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
