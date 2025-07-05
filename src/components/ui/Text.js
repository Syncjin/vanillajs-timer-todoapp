import { Component } from "@components/common/Component";

export class Text extends Component {
  createElement() {
    const el = document.createElement(this.props.as || "span"); // 기본 span
    el.className = this.getClassName();
    el.textContent = this.props.text || "";
    return el;
  }

  render() {
    this.el.className = this.getClassName();
    this.el.textContent = this.props.text || "";
  }

  getClassName() {
    const base = "text";
    const variant = this.props.variant ? `text--${this.props.variant}` : "";
    const color = this.props.color ? `text--${this.props.color}` : "";
    return [base, variant, color].filter(Boolean).join(" ");
  }
}

export default Text;
