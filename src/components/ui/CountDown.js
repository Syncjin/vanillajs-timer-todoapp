import { Component } from "@components/common/Component";

class CountDown extends Component {
  createElement() {
    return document.createElement(this.props.as || "span");
  }

  render() {
    this.time = this.props.time ?? 0; // 초기 시간 (초)
    this.onComplete = this.props.onComplete;
    this.el.textContent = `${this.time}초`;

    this.interval = setInterval(() => {
      this.time--;

      if (this.time <= 0) {
        this.el.textContent = "0초";
        clearInterval(this.interval);
        if (typeof this.onComplete === "function") {
          this.onComplete();
        }
        return;
      }

      this.el.textContent = `${this.time}초`;
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    super.destroy?.();
  }
}

export default CountDown;
