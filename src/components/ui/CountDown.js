import { Component } from "@components/core/Component";

class CountDown extends Component {
  createElement() {
    return document.createElement(this.props.as || "span");
  }

  render() {
    this.time = this.props.time ?? 0; // 초기 시간 (초)
    this.el.textContent = `${this.time}초`;
    this.onComplete = this.props.onComplete;
    this.onFinalSoon = this.props.onFinalSoon;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.time--;

      if (this.time <= 5) {
        if (typeof this.onFinalSoon === "function") {
          this.onFinalSoon();
        }
      }
      if (this.time <= 0) {
        this.el.textContent = "0초";
        clearInterval(this.interval);
        this.interval = null;
        console.log("0초 됌", typeof this.onComplete);
        if (typeof this.onComplete === "function") {
          this.onComplete();
        }
        return;
      }

      this.el.textContent = `${this.time}초`;
    }, 1000);
  }

  componentWillUnmount() {
    console.log("CountDown  componentWillUnmount");
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export default CountDown;
