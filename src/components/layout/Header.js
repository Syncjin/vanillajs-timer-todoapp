import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import MillieIcon from "@assets/images/millie.png";
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

    const logo = document.createElement("img");
    logo.src = MillieIcon;
    logo.alt = "Millie Logo";
    logo.className = "logo";

    const text = v(Text, { as: "h1", text: "밀리의 서재 사전 과제" });

    inner.appendChild(logo);
    inner.appendChild(renderDom(text));
    this.el.appendChild(inner);
  }
}

export default Header;
