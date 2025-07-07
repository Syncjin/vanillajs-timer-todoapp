import Store from "@store/store.js";
import { shortId } from "@utils/uuid.js";
/**
 * 팝업이 여러개 나올 수 있도록
 */

function showPopup(state) {
  const popupWithId = { ...state, id: shortId() };
  popupStore.state.popups = [...popupStore.state.popups, popupWithId];
  return popupWithId.id;
}

const popupStore = new Store({
  popups: [],
  showPopup,
  closePopup(id) {
    popupStore.state.popups = popupStore.state.popups.filter((p) => p.id !== id);
  },

  clearPopups() {
    popupStore.state.popups = [];
  },
});

export default popupStore;
