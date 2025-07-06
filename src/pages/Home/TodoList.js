import { Component } from "@components/common/Component";
import Text from "@components/ui/Text";
import "./TodoList.scss";
import Button from "@components/ui/Button";
import todoStore from "@store/todoStore";
import TodoItem from "@pages/Home/TodoItem";

class TodoList extends Component {
  createElement() {
    return document.createElement("div");
  }

  closeBtnOnClick(id) {
    console.log("closeBtnOnClick", id);
    todoStore.state.todoList = todoStore.state.todoList.filter((todo) => todo.id !== id);
  }

  renderItem() {
    console.log("render?");
    const todos = todoStore.state.todoList;
    this.listView.innerHTML = "";

    console.log("renderItem todo", todos);
    todos.map((todo) => {
      const item = new TodoItem({ id: todo.id, title: todo.title, time: todo.time, className: "todo-item", closeBtnOnClick: this.closeBtnOnClick });
      this.listView.appendChild(item.el);
    });
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

    this.listView = document.createElement("div");

    this.el.appendChild(text.el);
    this.el.appendChild(listHeaderView);

    this.listView.className = "todo-list-view";

    this.el.appendChild(this.listView);

    // 상태 연결
    todoStore.observe(() => this.renderItem());
    this.renderItem();
  }
}

export default TodoList;
