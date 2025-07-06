import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import "./TodoList.scss";
import Button from "@components/ui/Button";
import todoStore from "@store/todoStore";
import TodoItem from "@pages/Home/TodoItem";
import { v, diff, renderDom } from "@components/core/vdom";

class TodoList extends Component {
  createElement() {
    return document.createElement("div");
  }

  constructor(props) {
    super(props);
    this.oldVNode = null; // 이전 VDOM 저장용
  }

  closeBtnOnClick(id) {
    console.log("closeBtnOnClick", id);
    todoStore.state.todoList = todoStore.state.todoList.filter((todo) => todo.id !== id);

    console.log("result", todoStore.state.todoList);
  }

  renderItem() {
    const todos = todoStore.state.todoList;
    console.log("render? todos", todos);
    const childrenVNode = todos.map((todo) =>
      v(TodoItem, {
        id: todo.id,
        title: todo.title,
        time: todo.time,
        className: "todo-item",
        closeBtnOnClick: this.closeBtnOnClick,
      })
    );

    const newVNode = {
      type: "fragment",
      children: childrenVNode,
    };

    // 초기 렌더일 경우
    if (!this.oldVNode) {
      childrenVNode.map(renderDom).forEach((child) => {
        this.listView.appendChild(child);
      });
    } else {
      // diff만 수행 (listView 내부만 변경)
      diff(this.listView, this.oldVNode, newVNode);
    }

    this.oldVNode = newVNode;

    // const todoIdSet = new Set(todos.map((todo) => String(todo.id)));
    // // 삭제된 DOM 제거
    // Array.from(this.listView.children).forEach((child) => {
    //   const id = child.dataset.id;
    //   if (!todoIdSet.has(id)) {
    //     child.remove();
    //   }
    // });

    // const existingIds = new Set(Array.from(this.listView.children).map((child) => child.dataset.id));

    // for (const todo of todos) {
    //   if (!existingIds.has(String(todo.id))) {
    //     const item = v(TodoItem, { id: todo.id, title: todo.title, time: todo.time, className: "todo-item", closeBtnOnClick: this.closeBtnOnClick });

    //     console.log("item???", item);
    //     item.props.id = todo.id; // 추후 중복 체크용
    //     this.listView.appendChild(renderDom(item));
    //   }
    // }
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const text = v(Text, { as: "h2", text: "할 일 목록" });

    const listHeaderView = document.createElement("div");
    const sortView = document.createElement("div");
    const closeView = document.createElement("div");
    listHeaderView.className = "list-header-view";
    sortView.className = "sort-view";
    closeView.className = "close-view";

    const sortInputOrderBtn = v(Button, { label: "입력한 순" });
    const sortRemainingTimeOrderBtn = v(Button, { label: "남은 시간 순" });
    const allCloseBtn = v(Button, { label: "전체 종료", className: "close-btn", onClick: () => {} });
    const closeBtn = v(Button, { label: "선택 종료", className: "close-btn", onClick: () => {} });

    sortView.appendChild(renderDom(sortInputOrderBtn));
    sortView.appendChild(renderDom(sortRemainingTimeOrderBtn));
    closeView.appendChild(renderDom(allCloseBtn));
    closeView.appendChild(renderDom(closeBtn));

    listHeaderView.appendChild(sortView);
    listHeaderView.appendChild(closeView);

    this.listView = document.createElement("div");

    this.el.appendChild(renderDom(text));
    this.el.appendChild(listHeaderView);

    this.listView.className = "todo-list-view";

    this.el.appendChild(this.listView);

    // 상태 연결
    todoStore.observe(() => this.renderItem());
    this.renderItem();
  }
}

export default TodoList;
