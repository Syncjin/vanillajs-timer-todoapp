import { Component } from "./core/Component";
import Router from "./core/Router.js";
import Home from "@pages/Home/index.js";

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
  }
  render() {}
}

export default App;
