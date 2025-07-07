import { Component } from "@components/core/Component";
import popupStore from "@store/popupStore";
import { v, renderDom } from "@components/core/vdom";
import Popup from "@components/ui/Popup";

class PopupContainer extends Component {
  createElement() {
    return document.createElement("div");
  }

  renderPopup() {
    this.el.innerHTML = "";

    const { visible, text, buttons } = popupStore.state;
    if (!visible) return;

    const popupVNode = v(Popup, { text, buttons });
    const popupDom = renderDom(popupVNode);
    this.el.appendChild(popupDom);
  }

  render() {
    popupStore.observe(() => this.renderPopup());
    this.renderPopup();
  }
}

export default PopupContainer;
