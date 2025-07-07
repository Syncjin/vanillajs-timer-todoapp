import { Component } from "@components/core/Component";
import popupStore from "@store/popupStore";
import { v, renderDom } from "@components/core/vdom";
import Popup from "@components/ui/Popup";

class PopupContainer extends Component {
  createElement() {
    return document.createElement("div");
  }

  renderPopups() {
    this.el.innerHTML = "";

    popupStore.state.popups.forEach((popup) => {
      const popupVNode = v(Popup, {
        ...popup,
        onClose: () => popupStore.state.closePopup(popup.id),
      });
      this.el.appendChild(renderDom(popupVNode));
    });
  }

  render() {
    popupStore.observe(() => {
      this.renderPopups();
    });
    this.renderPopups();
  }
}

export default PopupContainer;
