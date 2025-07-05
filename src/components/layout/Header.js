import { Component } from "../common/Component";
import Text from "@components/ui/Text";

export class Header extends Component {
  createElement() {
    return document.createElement("header");
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const inner = document.createElement("div");
    const text = new Text({ as: "h1", text: "밀리의 서재 사전 과제" });

    inner.className = "header-inner";
    inner.appendChild(text.el);

    this.el.appendChild(inner);
  }
}

export default Header;
