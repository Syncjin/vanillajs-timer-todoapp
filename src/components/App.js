import { Component } from "./core/Component";
import Router from "./core/Router.js";
import Home from "@pages/Home/index.js";
import PopupContainer from "@components/ui/popup/PopupContainer";
class App extends Component {
  createElement() {
    const el = document.createElement("main");
    el.id = "root";
    return el;
  }

  init() {
    this.router = new Router(
      {
        "/": Home,
        "*": Home, // fallback route
      },
      this.el // <main id="app">에 렌더
    );
    const popupContainer = new PopupContainer();
    popupContainer.el.className = "popup-container";
    this.el.appendChild(popupContainer.el); // 팝업 항상 렌더
  }
  render() {}
}

export default App;
