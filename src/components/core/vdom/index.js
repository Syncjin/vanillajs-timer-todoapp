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

  // console.log("diff parent", parent);
  // console.log("diff oldVNode", oldVNode);
  // console.log("diff newVNode", newVNode);
  // console.log("diff el", el);

  if (oldVNode?.type === "fragment" && newVNode?.type === "fragment") {
    const oldChildren = oldVNode.children || [];
    const newChildren = newVNode.children || [];

    // console.log("diff oldChildren", oldChildren);
    // console.log("diff newChildren", newChildren);

    const keyedOld = new Map();
    oldChildren.forEach((child, idx) => {
      if (child?.key != null) keyedOld.set(child.key, { child, idx });
    });

    for (let i = 0; i < newChildren.length; i++) {
      const newChild = newChildren[i];
      const oldMatch = newChild?.key != null ? keyedOld.get(newChild.key) : undefined;

      if (oldMatch) {
        diff(parent, oldMatch.child, newChild, i);

        newChild._el = oldMatch.child._el;
        newChild._instance = oldMatch.child._instance;

        // 위치 관련
        const desiredEl = oldMatch.child._el;
        const currentEls = Array.from(parent.childNodes);
        const correctPosition = currentEls[i]; // i번째에 와야 할 자리

        if (desiredEl && desiredEl !== correctPosition && desiredEl.parentNode === parent) {
          parent.insertBefore(desiredEl, correctPosition ?? null);
        }

        keyedOld.delete(newChild.key);
      } else {
        // 새로 생긴 노드
        diff(parent, undefined, newChild, i);
      }
    }

    // 남은 old vnode들은 제거
    for (const { child } of keyedOld.values()) {
      // 언마운트 호출
      if (child._instance?.componentWillUnmount) {
        child._instance.componentWillUnmount();
      }
      // 실제 DOM 엘리먼트만 제거
      const elToRemove = child._el;
      if (elToRemove && elToRemove.parentNode === parent) {
        parent.removeChild(elToRemove);
      }
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
