import { Component } from "@components/common/Component";
import Text from "@components/ui/Text";
import "./TodoList.scss";
import Button from "@components/ui/Button";

export class TodoList extends Component {
  createElement() {
    return document.createElement("div");
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const text = new Text({ as: "h2", text: "할 일 목록" });

    const listHeaderView = document.createElement("div");
    const sortView = document.createElement("div");
    const closeView = document.createElement("div");
    listHeaderView.className = "list-header-view";
    sortView.className = "sort-view";
    closeView.className = "close-view";

    const sortInputOrderBtn = new Button({ label: "입력한 순" });
    const sortRemainingTimeOrderBtn = new Button({ label: "남은 시간 순" });
    const allCloseBtn = new Button({ label: "전체 종료", className: "close-btn", onClick: () => {} });
    const closeBtn = new Button({ label: "선택 종료", className: "close-btn", onClick: () => {} });

    sortView.appendChild(sortInputOrderBtn.el);
    sortView.appendChild(sortRemainingTimeOrderBtn.el);
    closeView.appendChild(allCloseBtn.el);
    closeView.appendChild(closeBtn.el);

    listHeaderView.appendChild(sortView);
    listHeaderView.appendChild(closeView);

    const listView = document.createElement("div");

    this.el.appendChild(text.el);
    this.el.appendChild(listHeaderView);

    listView.className = "todo-list-view";

    this.el.appendChild(listView);
  }
}

export default TodoList;
