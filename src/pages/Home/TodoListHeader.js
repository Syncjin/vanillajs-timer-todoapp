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

  initState() {
    return {
      sortType: "inputOrder",
    };
  }

  sortInputOrderOnClick() {
    console.log("sortInputOrderOnClick", todoStore.state.todoList);
    this.setState({ sortType: "inputOrder" });
    const todos = [...todoStore.state.todoList];
    todos.sort((a, b) => a.regDate - b.regDate);

    console.log("입력한순", todos);
    todoStore.state.todoList = [...todos];
  }

  sortRemainingTimeOrderOnClick() {
    console.log("sortRemainingTimeOrderOnClick", todoStore.state.todoList);
    // todoStore.state.sortType = "remainingTimeOrder";
    this.setState({ sortType: "remainingTimeOrder" });
    const todos = [...todoStore.state.todoList];
    const now = Date.now();
    todos.sort((a, b) => {
      const remainA = Math.max(0, Number(a.time * 1000) - (now - a.regDate));
      const remainB = Math.max(0, Number(b.time * 1000) - (now - b.regDate));
      return remainA - remainB;
    });

    todoStore.state.todoList = [...todos];
  }

  closeBtnOnClick(id) {
    console.log("closeBtnOnClick", id);
    todoStore.state.todoList = todoStore.state.todoList.filter((todo) => todo.id !== id);

    console.log("result", todoStore.state.todoList);
  }

  render() {
    this.el.innerHTML = "";
    const { className = "" } = this.props;
    const { sortType } = this.state;

    this.el.className = className;
    const text = v(Text, { as: "h2", text: "할 일 목록" });

    const listHeaderView = document.createElement("div");
    const sortView = document.createElement("div");
    const closeView = document.createElement("div");
    listHeaderView.className = "list-header-view";
    sortView.className = "sort-view";
    closeView.className = "close-view";

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
    const allCloseBtn = v(Button, { label: "전체 종료", className: "close-btn", onClick: () => {} });
    const closeBtn = v(Button, { label: "선택 종료", className: "close-btn", onClick: () => {} });

    sortView.appendChild(renderDom(sortInputOrderBtn));
    sortView.appendChild(renderDom(sortRemainingTimeOrderBtn));
    closeView.appendChild(renderDom(allCloseBtn));
    closeView.appendChild(renderDom(closeBtn));

    this.el.appendChild(sortView);
    this.el.appendChild(closeView);
  }
}

export default TodoListHeader;
