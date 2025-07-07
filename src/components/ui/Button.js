import { Component } from "@components/core/Component";
import { renderDom } from "@components/core/vdom";
export class Button extends Component {
  createElement() {
    return document.createElement("button");
  }

  render() {
    const { label = "Button", className = "", disabled = false, onClick, children = null } = this.props;

    this.el.innerHTML = "";
    this.el.className = className;
    this.el.disabled = disabled;

    // 기존 이벤트 제거 후 새로 연결
    this.el.onclick = null;
    if (typeof onClick === "function") {
      this.el.addEventListener("click", onClick);
    }

    if (Array.isArray(children)) {
      children.map(renderDom).forEach((child) => this.el.appendChild(child));
    } else if (typeof children === "object" && children !== null) {
      this.el.appendChild(renderDom(children));
    } else {
      this.el.textContent = label;
    }
  }
}

export default Button;
