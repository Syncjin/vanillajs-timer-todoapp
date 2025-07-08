import { Component } from "@components/core/Component";
import Button from "@components/ui/Button";
import Check from "@components/ui/Check";
import Text from "@components/ui/Text";
import CountDown from "@components/ui/CountDown";
import Input from "@components/ui/Input";
import { v, renderDom } from "@components/core/vdom";
import "./TodoItem.scss";

class TodoItem extends Component {
  createElement() {
    return document.createElement("div");
  }

  initState() {
    return {
      isEdit: false,
    };
  }

  componentDidMount() {
    this.countDown = v(CountDown, {
      time: Number(this.props.time),
      onComplete: () => {
        this.props.timeCloseFn?.(this.props.id);
      },
      onFinalSoon: () => {
        this.el.classList.add("active");
      },
    });
    this.countDownDom = renderDom(this.countDown);
    this.countDownContainer.appendChild(this.countDownDom);
    if (this.props.time <= 5) {
      this.el.classList.add("active");
    }
  }

  render() {
    const { className = "", id, title, closeBtnOnClick, editBtnOnClick, isChecked, checkBtnOnClick } = this.props;

    this.el.className = className;

    console.log("todo title:", title);
    if (!this.el.hasChildNodes()) {
      const checkBtn = v(Check, {
        checked: isChecked,
        onChange: (checked) => {
          console.log("체크 상태:", checked);
          checkBtnOnClick?.(id, checked);
        },
      });

      this.textWrapper = document.createElement("div");
      this.renderTextWrapper(title);

      this.countDownContainer = document.createElement("div");

      this.editBtn = v(Button, {
        label: this.state.isEdit ? "수정완료" : "수정",
        className: "edit-btn",
        onClick: () => {
          const willEdit = !this.state.isEdit;
          if (willEdit) {
            this.countDown._instance?.pause();
          } else {
            this.countDown._instance?.resume();
          }
          this.setState({ isEdit: willEdit });
          editBtnOnClick?.(id, () => {
            if (!this.state.isEdit) {
              return {
                text: this.editInput._instance.inputEl.value,
              };
            }
            return;
          });
        },
      });

      const closeBtn = v(Button, {
        label: "종료",
        className: "close-btn",
        onClick: () => {
          console.log("closeBtn", id);
          closeBtnOnClick?.(id);
        },
      });

      this.el.appendChild(renderDom(checkBtn));
      this.el.appendChild(this.textWrapper);
      this.el.appendChild(this.countDownContainer);
      this.el.appendChild(renderDom(this.editBtn));
      this.el.appendChild(renderDom(closeBtn));
    } else {
      this.renderTextWrapper(title);
      this.editBtn._instance?.update({
        label: this.state.isEdit ? "수정완료" : "수정",
      });
    }
  }

  renderTextWrapper(title) {
    this.textWrapper.innerHTML = "";
    if (this.state.isEdit) {
      this.editInput = v(Input, {
        value: title,
        className: "input",
        placeholder: "수정할 내용 입력",
      });
      this.textWrapper.appendChild(renderDom(this.editInput));
    } else {
      const text = v(Text, { text: title });
      this.textWrapper.appendChild(renderDom(text));
    }
  }

  componentWillUnmount() {
    console.log("this.countDown", this.countDown._instance);
    this.countDown._instance?.unmount(); // 시간초가 다 되기전 종료시
    console.log("todoitem  componentWillUnmount");
  }
}

export default TodoItem;
