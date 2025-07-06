import { Component } from "@components/core/Component";
import Button from "@components/ui/Button";
import Text from "@components/ui/Text";
import CountDown from "@components/ui/CountDown";
import { v, renderDom } from "@components/core/vdom";
import "./TodoItem.scss";

class TodoItem extends Component {
  createElement() {
    return document.createElement("div");
  }

  render() {
    const { className = "", id, title, time, closeBtnOnClick } = this.props;

    console.log("TodoItem", this.props);
    const text = v(Text, { text: title });
    // const timer = new Text({ text: `${time}초` });
    this.countDown = v(CountDown, {
      time: Number(time),
      onComplete: () => {
        console.log("onComplete???");
        closeBtnOnClick?.(id);
      },
    });

    const closeBtn = v(Button, {
      label: "종료",
      className: "close-btn",
      onClick: () => {
        console.log("closeBtn", id);
        closeBtnOnClick?.(id);
      },
    });

    this.el.className = className;
    this.el.appendChild(renderDom(text));
    this.el.appendChild(renderDom(this.countDown));
    this.el.appendChild(renderDom(closeBtn));
  }

  componentWillUnmount() {
    console.log("this.countDown", this.countDown._instance);
    this.countDown._instance?.unmount(); // 시간초가 다 되기전 종료시
    console.log("todoitem  componentWillUnmount");
  }
}

export default TodoItem;
