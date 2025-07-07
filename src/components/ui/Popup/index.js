import { Component } from "@components/core/Component";
import { renderDom, v } from "@components/core/vdom";
import Button from "@components/ui/Button";
import Text from "@components/ui/Text";
import "./Popup.scss";

export class Popup extends Component {
  createElement() {
    const container = document.createElement("div");
    container.className = "popup-backdrop";
    return container;
  }

  render() {
    const { text = "", buttons = [] } = this.props;

    const popupEl = document.createElement("div");
    popupEl.className = "popup";

    const textEl = v(Text, { as: "p", className: "popup-text", text });

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "popup-buttons";

    buttons.forEach((btn) => {
      const buttonVNode = v(Button, {
        label: btn.label,
        className: btn.className || "",
        onClick: btn.onClick,
      });
      buttonContainer.appendChild(renderDom(buttonVNode));
    });

    popupEl.appendChild(renderDom(textEl));
    popupEl.appendChild(buttonContainer);

    this.el.innerHTML = "";
    this.el.appendChild(popupEl);
  }
}

export default Popup;
