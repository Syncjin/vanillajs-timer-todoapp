// @store/popupStore.js
import Store from "@store/store";

const popupStore = new Store({
  visible: false,
  text: "",
  buttons: [],
  open({ text, buttons }) {
    popupStore.state.visible = true;
    popupStore.state.text = text;
    popupStore.state.buttons = buttons;
  },
  close() {
    popupStore.state.visible = false;
    popupStore.state.text = "";
    popupStore.state.buttons = [];
  },
});

export default popupStore;
