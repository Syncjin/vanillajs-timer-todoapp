import { Component } from "@components/common/Component";
import Text from "@components/ui/Text";
import "./TodoInput.scss";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";

export class TodoInput extends Component {
  createElement() {
    return document.createElement("div");
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const inner = document.createElement("div");
    const text = new Text({ as: "h2", text: "할 일 만들기" });

    const todoInput = new Input({ label: "할 일 작성", className: "input", placeholder: "할 일 내용 입력" });
    const endTodoInput = new Input({ label: "종료 시간", className: "input", placeholder: "초 단위 시간 입력" });
    const button = new Button({
      label: "추가",
      className: "add-btn",
      onClick: () => {
        console.log("todoInput text", todoInput.inputEl.value);
        console.log("endTodoInput text", endTodoInput.inputEl.value);
      },
    });

    this.el.appendChild(text.el);

    inner.className = "todo-input-inner";

    inner.appendChild(todoInput.el);
    inner.appendChild(endTodoInput.el);
    inner.appendChild(button.el);
    this.el.appendChild(inner);
  }
}

export default TodoInput;
