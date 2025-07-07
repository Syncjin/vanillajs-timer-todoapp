import { Component } from "@components/core/Component";
import { renderDom } from "@components/core/vdom";
import CheckIcon from "@assets/images/check.svg";

export class Check extends Component {
  createElement() {
    return document.createElement("button");
  }

  initState() {
    return {
      checked: this.props.checked || false,
    };
  }

  toggleCheck = () => {
    console.log("toggleCheck", this.state.checked);
    const next = !this.state.checked;
    this.setState({ checked: next });
    this.props.onChange?.(next);
  };

  render() {
    const { className = "", label = "", disabled = false } = this.props;
    const { checked } = this.state;

    this.el.innerHTML = "";
    this.el.className = `check ${className}`.trim();
    this.el.disabled = disabled;

    this.el.onclick = () => {
      this.toggleCheck();
    };

    // 체크 상태일 때 아이콘 추가
    if (checked) {
      const iconEl = renderDom({
        type: "img",
        props: {
          src: CheckIcon,
          className: "check-icon",
          alt: "체크됨",
        },
      });
      this.el.appendChild(iconEl);
    }

    if (label) {
      const textNode = document.createTextNode(label);
      this.el.appendChild(textNode);
    }
  }
}

export default Check;
