import { Component } from "@components/core/Component";

/**
 * input + label을 합친 컴포넌트입니다.
 */
class Input extends Component {
  createElement() {
    return document.createElement("div");
  }

  /**
   * id 지정이 안되었을경우 label htmlFor가 동작하도록 임시 id 지정
   */
  render() {
    const { id = `input-${Math.random().toString(36).slice(2, 8)}`, value = "", label = "", placeholder = "", type = "text", className = "", disabled = false, onInput } = this.props;

    let labelEl;
    if (label) {
      labelEl = document.createElement("label");
      labelEl.htmlFor = id;
      labelEl.textContent = label;
      labelEl.className = "input-label";
    }

    const inputEl = document.createElement("input");
    inputEl.id = id;
    inputEl.value = value;
    inputEl.placeholder = placeholder;
    inputEl.type = type;
    inputEl.disabled = disabled;

    inputEl.onInput = null;
    if (typeof onInput === "function") {
      inputEl.addEventListener("input", (e) => onInput(e.target.value));
    }

    this.el.innerHTML = "";
    if (labelEl) this.el.appendChild(labelEl);
    this.el.appendChild(inputEl);
    this.el.className = className;
    this.inputEl = inputEl;
  }
}

export default Input;
