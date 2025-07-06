import { Component } from "@components/common/Component";
import Button from "@components/ui/Button";
import Text from "@components/ui/Text";
import "./TodoItem.scss";

class TodoItem extends Component {
  createElement() {
    return document.createElement("div");
  }

  render() {
    const { className = "", id, title, time, closeBtnOnClick } = this.props;

    console.log("TodoItem", this.props);
    const text = new Text({ text: title });
    const timer = new Text({ text: `${time}초` });

    const closeBtn = new Button({
      label: "종료",
      className: "close-btn",
      onClick: () => {
        console.log("closeBtn", id);
        closeBtnOnClick?.(id);
      },
    });

    this.el.className = className;
    this.el.appendChild(text.el);
    this.el.appendChild(timer.el);
    this.el.appendChild(closeBtn.el);
  }
}

export default TodoItem;
