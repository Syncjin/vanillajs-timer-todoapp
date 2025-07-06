/**
 * 기본 컴포넌트. 모든 컴포넌트는 다음 클래스를 확장하여 사용합니다.
 * init, update, unmount, render등 React 컴포넌트의 구조를 생각해서 사용할 계획입니다.
 */
export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = this.initState?.() || {};
    this.el = this.createElement();
    this.init();
  }

  init() {
    this.render();
    if (typeof this.componentDidMount === "function") {
      this.componentDidMount();
    }
  }

  setState(partialState = {}) {
    this.state = { ...this.state, ...partialState };
    this.render();
    if (typeof this.componentDidUpdate === "function") {
      this.componentDidUpdate();
    }
  }

  update(newProps = {}) {
    this.props = { ...this.props, ...newProps };
    this.render();
    if (typeof this.componentDidUpdate === "function") {
      this.componentDidUpdate();
    }
  }

  unmount() {
    console.log("unmount?>?");
    if (typeof this.componentWillUnmount === "function") {
      this.componentWillUnmount();
    }
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
  }

  createElement() {
    return document.createElement("div"); // 기본값
  }

  render() {
    // override 필수
  }
}
