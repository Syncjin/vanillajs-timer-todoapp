import { Component } from "@components/core/Component";

class CountDown extends Component {
  createElement() {
    return document.createElement(this.props.as || "span");
  }

  render() {
    this.time = this.props.time ?? 0; // 초기 시간 (초)
    this.el.textContent = `${this.time}초`;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.time--;
      console.log("interval", this.time);

      if (this.time <= 0) {
        this.el.textContent = "0초";
        clearInterval(this.interval);
        this.interval = null;

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
      console.log("clear??");
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export default CountDown;
