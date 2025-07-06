/**
 * 가상 돔 만들기
 */
export function v(type, props = {}, ...children) {
  return { type, props, children };
}

/**
 * vdom을 render할때 사용합니다.
 * 예 v("div", { className: "btn"})
 * const node = new Button({label: "버튼"}); 대신
 *
 * const node = v(Button, {label: "버튼"});
 * div.appendChild(renderDom(node));
 */

export function renderDom(node) {
  if (typeof node.type === "string") {
    // 문자열로 태그 생성
    const el = document.createElement(node.type);

    for (const [key, value] of Object.entries(node.props || {})) {
      if (key.startsWith("on") && typeof value === "function") {
        // 이벤트가 있다면
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === "className") {
        // className을 가지고 있을때
        el.className = value;
      } else {
        // attribute
        el.setAttribute(key, value);
      }
    }
    (node.children || []).forEach((child) => {
      el.appendChild(render(child));
    });
    return el;
  }

  // fragment 처리
  if (node.type === "fragment") {
    const container = document.createElement("div");
    container.setAttribute("data-fragment", "true");

    (node.children || []).forEach((child) => {
      container.appendChild(renderDom(child));
    });

    return container;
  }
  // 컴포넌트 클래스 (Component 상속한 경우)
  const instance = new node.type(node.props);
  node._instance = instance; // diff에서 추적 가능하도록
  const dom = instance.el;
  return dom;
}

export function diff(parent, oldVNode, newVNode, index = 0) {
  const el = parent.childNodes[index];

  console.log("diff???", el);
  console.log("diff??? oldVNode", oldVNode);
  console.log("diff??? newVNode", newVNode);
  if (oldVNode?.type === "fragment" && newVNode?.type === "fragment") {
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];
    const max = Math.max(oldVNode.children.length, newVNode.children.length);

    for (let i = 0; i < max; i++) {
      diff(parent, oldChildren[i], newChildren[i], i);
    }
    return;
  }

  // 처음 렌더링
  if (!oldVNode) {
    parent.appendChild(renderDom(newVNode));
    return;
  }
  // 노드 제거
  if (!newVNode) {
    if (oldVNode._instance?.componentWillUnmount) {
      oldVNode._instance.componentWillUnmount();
    }
    if (el) parent.removeChild(el);
    return;
  }
  // 타입이 달라졌다면 노드 교체
  if (oldVNode?.type !== newVNode?.type) {
    if (oldVNode?._instance?.componentWillUnmount) {
      oldVNode._instance.componentWillUnmount();
    }
    const newEl = renderDom(newVNode);
    if (el) {
      parent.replaceChild(renderDom(newEl), el);
    } else {
      parent.appendChild(renderDom(newEl));
    }
    return;
  }
  // 동일한 태그일 때 자식 재귀 비교
  if (typeof newVNode.type === "function") {
    const oldInstance = oldVNode._instance;
    const newInstance = new newVNode.type(newVNode.props);
    newVNode._instance = newInstance;

    if (oldInstance?.componentWillUnmount) {
      oldInstance.componentWillUnmount();
    }

    // 여기서 직접 DOM을 바꿀지, 내부 diff 할지는 판단 필요
    const newEl = newInstance.el;
    const oldEl = oldInstance?.el;

    if (oldEl && parent.contains(oldEl)) {
      parent.replaceChild(newEl, oldEl);
    } else {
      parent.appendChild(newEl);
    }
    return;
  }

  if (typeof newVNode.type === "string") {
    const max = Math.max(oldVNode.children.length, newVNode.children.length);
    for (let i = 0; i < max; i++) {
      diff(el, oldVNode.children[i], newVNode.children[i], i);
    }
  }
}
