import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import "./TodoInput.scss";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import { shortId } from "@utils/uuid.js";

import todoStore from "@store/todoStore";
import { v, renderDom } from "@components/core/vdom";

export class TodoInput extends Component {
  createElement() {
    return document.createElement("div");
  }

  addTodoOnClick() {
    console.log("addTodoOnClick", this.todoInput);
    const content = this.todoInput._instance.inputEl.value;
    const time = this.endTodoInput._instance.inputEl.value;
    console.log("todoInput text", content);
    console.log("endTodoInput text", time);
    if (!content || !time) return;

    const newTodo = { id: shortId(), title: content, time, regDate: Date.now() };
    todoStore.state.todoList = [...todoStore.state.todoList, newTodo];
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const inner = document.createElement("div");
    const text = v(Text, { as: "h2", text: "할 일 만들기" });

    this.todoInput = v(Input, { label: "할 일 작성", className: "input", placeholder: "할 일 내용 입력" });
    this.endTodoInput = v(Input, { label: "종료 시간", className: "input", placeholder: "초 단위 시간 입력" });
    const button = v(Button, {
      label: "추가",
      className: "add-btn",
      onClick: () => {
        this.addTodoOnClick();
      },
    });

    this.el.appendChild(renderDom(text));

    inner.className = "todo-input-inner";

    inner.appendChild(renderDom(this.todoInput));
    inner.appendChild(renderDom(this.endTodoInput));
    inner.appendChild(renderDom(button));
    this.el.appendChild(inner);
  }
}

export default TodoInput;
