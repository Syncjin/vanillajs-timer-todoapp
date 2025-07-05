import { Component } from "@components/common/Component";
import Header from "@components/layout/Header";
import TodoInput from "@pages/Home/TodoInput";

class Home extends Component {
  createElement() {
    const div = document.createElement("div");
    div.className = "home-page";
    return div;
  }

  render() {
    const header = new Header({ className: "header" });
    this.el.appendChild(header.el);

    const todoList = new TodoInput({ className: "todo-input" });
    this.el.appendChild(todoList.el);
  }
}

export default Home;
