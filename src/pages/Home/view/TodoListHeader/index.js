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

    const closeList = [...todoStore.state.todoList, ...todoStore.state.todoCloseList];
    todoStore.state.todoCloseList = closeList;
    todoStore.state.todoList = [];
  }

  selectCloseBtnOnClick() {
    console.log(
      "selectCloseBtnOnClick",
      todoStore.state.todoList.filter((todo) => todo.isChecked)
    );

    const unCheckList = todoStore.state.todoList.filter((todo) => !todo.isChecked);

    const checkList = todoStore.state.todoList.filter((todo) => todo.isChecked);
    console.log("체크 아닌 목록", unCheckList);
    console.log("체크 목록", checkList);
    todoStore.state.todoList = unCheckList;
    todoStore.state.todoCloseList = [...todoStore.state.todoCloseList, ...checkList];
  }

  renderBtn() {
    this.sortView.innerHTML = "";
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

    this.sortView.appendChild(renderDom(sortInputOrderBtn));
    this.sortView.appendChild(renderDom(sortRemainingTimeOrderBtn));
  }

  renderCloseBtns() {
    this.closeView.innerHTML = "";

    const hasChecked = todoStore.state.todoList.some((todo) => todo.isChecked);

    const allCloseBtn = v(Button, {
      label: "전체 종료",
      className: "close-btn",
      onClick: () => this.allCloseBtnOnClick(),
    });

    const closeBtn = v(Button, {
      label: "선택 종료",
      className: "select-close-btn",
      disabled: !hasChecked,
      onClick: () => this.selectCloseBtnOnClick(),
    });

    this.closeView.appendChild(renderDom(allCloseBtn));
    this.closeView.appendChild(renderDom(closeBtn));
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;

    const listHeaderView = document.createElement("div");
    this.sortView = document.createElement("div");
    this.closeView = document.createElement("div");
    listHeaderView.className = "list-header-view";
    this.sortView.className = "sort-view";
    this.closeView.className = "close-view";

    this.el.appendChild(this.sortView);
    this.el.appendChild(this.closeView);

    todoStore.observe(() => {
      this.renderBtn();
      this.renderCloseBtns();
    });
    this.renderBtn();
    this.renderCloseBtns();
  }
}

export default TodoListHeader;
