import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import "./TodoListHeader.scss";
import Button from "@components/ui/Button";
import todoStore from "@store/todoStore";
import { v, renderDom } from "@components/core/vdom";
import CheckIcon from "@assets/images/check.svg";

class TodoListHeader extends Component {
  createElement() {
    return document.createElement("div");
  }

  constructor(props) {
    super(props);
  }

  sortInputOrderOnClick() {
    console.log("sortInputOrderOnClick", todoStore.state.todoList);
    todoStore.state.sortType = "inputOrder";

    const todos = todoStore.state.sortInputOrderFn(todoStore.state);
    todoStore.state.todoList = [...todos];
  }

  sortRemainingTimeOrderOnClick() {
    console.log("sortRemainingTimeOrderOnClick", todoStore.state.todoList);
    todoStore.state.sortType = "remainingTimeOrder";

    const todos = todoStore.state.sortRemainingTimeOrderFn(todoStore.state);
    todoStore.state.todoList = [...todos];
  }

  allCloseBtnOnClick() {
    console.log("allCloseBtnOnClick");
    todoStore.state.todoList = [];
  }

  selectCloseBtnOnClick() {
    console.log(
      "selectCloseBtnOnClick",
      todoStore.state.todoList.filter((todo) => todo.isChecked)
    );
    todoStore.state.todoList = todoStore.state.todoList.filter((todo) => !todo.isChecked);

    // console.log("result", todoStore.state.todoList);
  }

  renderBtn(sortView) {
    sortView.innerHTML = "";
    const sortType = todoStore.state.sortType;
    const icon = () =>
      v("img", {
        src: CheckIcon,
        className: "check-icon",
        alt: "선택됨",
      });

    const sortInputOrderBtn = v(Button, {
      label: "입력한 순",
      onClick: () => {
        this.sortInputOrderOnClick();
      },
      children: sortType === "inputOrder" ? [icon(), "입력한 순"] : ["입력한 순"],
    });
    const sortRemainingTimeOrderBtn = v(Button, {
      label: "남은 시간 순",
      onClick: () => {
        this.sortRemainingTimeOrderOnClick();
      },
      children: sortType === "remainingTimeOrder" ? [icon(), "남은 시간 순"] : ["남은 시간 순"],
    });

    sortView.appendChild(renderDom(sortInputOrderBtn));
    sortView.appendChild(renderDom(sortRemainingTimeOrderBtn));
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;

    const listHeaderView = document.createElement("div");
    const sortView = document.createElement("div");
    const closeView = document.createElement("div");
    listHeaderView.className = "list-header-view";
    sortView.className = "sort-view";
    closeView.className = "close-view";

    const allCloseBtn = v(Button, { label: "전체 종료", className: "close-btn", onClick: this.allCloseBtnOnClick });
    const closeBtn = v(Button, { label: "선택 종료", className: "close-btn", onClick: this.selectCloseBtnOnClick });

    closeView.appendChild(renderDom(allCloseBtn));
    closeView.appendChild(renderDom(closeBtn));

    this.el.appendChild(sortView);
    this.el.appendChild(closeView);

    todoStore.observe(() => this.renderBtn(sortView));
    this.renderBtn(sortView);
  }
}

export default TodoListHeader;
