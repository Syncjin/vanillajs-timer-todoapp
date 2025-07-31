import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import "./Header.scss";
import { v, renderDom } from "@components/core/vdom";
export class Header extends Component {
  createElement() {
    return document.createElement("header");
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const inner = document.createElement("div");
    inner.className = "header-inner";

    const text = v(Text, { as: "h1", text: "vanilla js React like timer todo app" });

    inner.appendChild(renderDom(text));
    this.el.appendChild(inner);
  }
}

export default Header;
