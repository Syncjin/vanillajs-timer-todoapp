import { Component } from "./common/Component";

class App extends Component {
  createElement() {
    const el = document.createElement("main");
    el.id = "app";
    return el;
  }

  render() {}
}

export default App;
