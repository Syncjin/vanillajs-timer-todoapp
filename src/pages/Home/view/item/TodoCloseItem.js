import { Component } from "@components/core/Component";
import Button from "@components/ui/Button";
import Text from "@components/ui/Text";
import { v, renderDom } from "@components/core/vdom";
import "./TodoItem.scss";

class TodoCloseItem extends Component {
  createElement() {
    return document.createElement("div");
  }

  render() {
    const { className = "", id, title, time, resetBtnOnClick } = this.props;

    console.log("TodoCloseItem", this.props);

    const text = v(Text, { text: title });

    const timeText = v(Text, { text: `${time}초` });

    const resetBtn = v(Button, {
      label: "복원",
      className: "reset-btn",
      onClick: () => {
        console.log("reset", id);
        resetBtnOnClick?.(id);
      },
    });

    this.el.className = className;
    this.el.appendChild(renderDom(text));
    this.el.appendChild(renderDom(timeText));
    this.el.appendChild(renderDom(resetBtn));
  }
}

export default TodoCloseItem;
