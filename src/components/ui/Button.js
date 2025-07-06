import { Component } from "@components/core/Component";

export class Button extends Component {
  createElement() {
    return document.createElement("button");
  }

  render() {
    const { label = "Button", className = "", disabled = false, onClick } = this.props;

    this.el.textContent = label;
    this.el.className = className;
    this.el.disabled = disabled;

    // 기존 이벤트 제거 후 새로 연결
    this.el.onclick = null;
    if (typeof onClick === "function") {
      this.el.addEventListener("click", onClick);
    }
  }
}

export default Button;
