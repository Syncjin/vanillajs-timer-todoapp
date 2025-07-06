/**
 * 가상 돔 만들기
 */
export function v(type, props = {}, ...children) {
  return { type, props, children, key: props?.key };
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
      el.appendChild(renderDom(child));
    });
    node._el = el;
    return el;
  }

  // fragment 처리
  if (node.type === "fragment") {
    const container = document.createDocumentFragment();
    (node.children || []).forEach((child) => {
      container.appendChild(renderDom(child));
    });
    return container;
  }
  // 컴포넌트 클래스 (Component 상속한 경우)
  const instance = new node.type(node.props);
  node._instance = instance; // diff에서 추적 가능하도록
  node._el = instance.el;
  return instance.el;
}

export function diff(parent, oldVNode, newVNode, index = 0) {
  const el = parent.childNodes[index];

  console.log("diff parent", parent);
  console.log("diff oldVNode", oldVNode);
  console.log("diff newVNode", newVNode);
  console.log("diff el", el);

  if (oldVNode?.type === "fragment" && newVNode?.type === "fragment") {
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];

    const keyedOld = new Map();
    oldChildren.forEach((child, idx) => {
      if (child?.key != null) {
        keyedOld.set(child.key, { child, idx });
      }
    });

    let i = 0;

    for (const newChild of newChildren) {
      const oldMatch = newChild?.key != null ? keyedOld.get(newChild.key) : undefined;
      if (oldMatch) {
        // 재사용: 기존 vnode로 diff
        diff(parent, oldMatch.child, newChild, i);

        const currentEl = oldMatch.child._el;
        const expectedPosition = parent.childNodes[i];

        if (currentEl && currentEl !== expectedPosition) {
          parent.insertBefore(currentEl, expectedPosition);
        }

        keyedOld.delete(newChild.key);
      } else {
        // 새로운 노드 추가
        // diff(parent, undefined, newChild, i);

        const newEl = renderDom(newChild);
        const expectedPosition = parent.childNodes[i];
        parent.insertBefore(newEl, expectedPosition);
      }
      i++;
    }

    // 남은 old vnode들은 제거
    for (const { child, idx } of keyedOld.values()) {
      diff(parent, child, undefined, idx);
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

  // 타입 or key 불일치 시 교체
  const isDifferentType = oldVNode.type !== newVNode.type;
  const isDifferentKey = oldVNode.key !== newVNode.key;

  if (isDifferentType || isDifferentKey) {
    if (oldVNode._instance?.componentWillUnmount) {
      oldVNode._instance.componentWillUnmount();
    }
    const newEl = renderDom(newVNode);
    if (el) {
      parent.replaceChild(newEl, el);
    } else {
      parent.appendChild(newEl);
    }
    return;
  }
}
