import { Component } from "@components/core/Component";
import Text from "@components/ui/Text";
import "./TodoList.scss";
import todoStore from "@store/todoStore";
import TodoItem from "@pages/Home/view/item/TodoItem";
import TodoListHeader from "@pages/Home/view/TodoListHeader";
import { v, diff, renderDom } from "@components/core/vdom";
import popupStore from "@store/popupStore";

class TodoList extends Component {
  createElement() {
    return document.createElement("div");
  }

  constructor(props) {
    super(props);
    this.oldVNode = null; // 이전 VDOM 저장용
  }

  checkBtnOnClick(id, checked) {
    console.log("checkBtnOnClick", id, checked);
    const newTodos = todoStore.state.todoList.map((todo) => (todo.id === id ? { ...todo, isChecked: checked } : todo));
    todoStore.state.todoList = newTodos;
  }

  closeBtnOnClick(id) {
    console.log("closeBtnOnClick", id);

    const closeItem = todoStore.state.todoList.filter((todo) => todo.id === id);
    todoStore.state.todoList = todoStore.state.todoList.filter((todo) => todo.id !== id);
    todoStore.state.todoCloseList = [...todoStore.state.todoCloseList, ...closeItem];
  }

  editBtnOnClick(id, callback) {
    console.log("editBtnOnClick", id, callback);
    const editText = callback?.();
    console.log("editText", editText);

    if (!editText) return;

    todoStore.state.todoList = todoStore.state.todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title: editText.text,
        };
      }
      return todo;
    });

    console.log("todoStore.state.todoList", todoStore.state.todoList);
  }

  timeCloseFn(id) {
    console.log("timeCloseFn", id);

    const closeItem = todoStore.state.todoList.filter((todo) => todo.id === id);
    todoStore.state.todoList = todoStore.state.todoList.filter((todo) => todo.id !== id);
    todoStore.state.todoCloseList = [...todoStore.state.todoCloseList, ...closeItem];
    if (!closeItem) return;

    const popupId = popupStore.state.showPopup({
      text: `[${closeItem?.[0].title}] 아이템이 종료 되었습니다.`,
      buttons: [
        {
          label: "확인",
          onClick: () => {
            popupStore.state.closePopup(popupId);
          },
        },
      ],
    });
  }

  renderItem() {
    const todos = todoStore.state.todoList;
    const childrenVNode = todos.map((todo) =>
      v(TodoItem, {
        ...todo,
        key: todo.id,
        isChecked: todo.isChecked ?? false,
        className: "todo-item",
        closeBtnOnClick: this.closeBtnOnClick,
        editBtnOnClick: this.editBtnOnClick,
        checkBtnOnClick: this.checkBtnOnClick,
        timeCloseFn: this.timeCloseFn,
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
  }

  render() {
    const { className = "" } = this.props;

    this.el.className = className;
    const text = v(Text, { as: "h2", text: "할 일 목록" });
    const listHeaderView = v(TodoListHeader, { className: "list-header-view" });

    this.listView = document.createElement("div");

    this.el.appendChild(renderDom(text));
    this.el.appendChild(renderDom(listHeaderView));

    this.listView.className = "todo-list-view";

    this.el.appendChild(this.listView);

    // 상태 연결
    todoStore.observe(() => this.renderItem());
    this.renderItem();
  }
}

export default TodoList;
