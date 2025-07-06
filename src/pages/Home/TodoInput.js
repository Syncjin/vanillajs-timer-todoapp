import { Component } from "@components/common/Component";
import Text from "@components/ui/Text";
import "./TodoInput.scss";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";

import todoStore from "@store/todoStore";
export class TodoInput extends Component {
  createElement() {
    return document.createElement("div");
  }

  addTodoOnClick() {
    console.log("addTodoOnClick", this.todoInput);
    const content = this.todoInput.inputEl.value;
    const time = this.endTodoInput.inputEl.value;
    console.log("todoInput text", content);
    console.log("endTodoInput text", time);
    if (!content || !time) return;

    const newTodo = { id: Date.now(), title: content, time };
    todoStore.state.todoList = [...todoStore.state.todoList, newTodo];
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const inner = document.createElement("div");
    const text = new Text({ as: "h2", text: "할 일 만들기" });

    this.todoInput = new Input({ label: "할 일 작성", className: "input", placeholder: "할 일 내용 입력" });
    this.endTodoInput = new Input({ label: "종료 시간", className: "input", placeholder: "초 단위 시간 입력" });
    const button = new Button({
      label: "추가",
      className: "add-btn",
      onClick: () => {
        this.addTodoOnClick();
      },
    });

    this.el.appendChild(text.el);

    inner.className = "todo-input-inner";

    inner.appendChild(this.todoInput.el);
    inner.appendChild(this.endTodoInput.el);
    inner.appendChild(button.el);
    this.el.appendChild(inner);
  }
}

export default TodoInput;
