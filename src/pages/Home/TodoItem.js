import { Component } from "@components/common/Component";
import Button from "@components/ui/Button";
import Text from "@components/ui/Text";
import CountDown from "@components/ui/CountDown";

import "./TodoItem.scss";

class TodoItem extends Component {
  createElement() {
    return document.createElement("div");
  }

  render() {
    const { className = "", id, title, time, closeBtnOnClick } = this.props;

    console.log("TodoItem", this.props);
    const text = new Text({ text: title });
    // const timer = new Text({ text: `${time}초` });
    this.timer = new CountDown({
      time: Number(time),
      onComplete: () => {
        closeBtnOnClick?.(id);
      },
    });

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
    this.el.appendChild(this.timer.el);
    this.el.appendChild(closeBtn.el);
  }

  componentWillUnmount() {
    this.countDown?.unmount(); // 시간초가 다 되기전 종료시
  }
}

export default TodoItem;
