/**
 * 페이지 Router 컴포넌트. 해당 프로젝트에서는 Home밖에 없음.
 */
class Router {
  constructor(routes = {}, rootEl) {
    this.routes = routes;
    this.root = rootEl;
    this.current = null;

    this.onPopState = this.render.bind(this);
    window.addEventListener("popstate", this.onPopState);

    this.render();
  }

  navigate(path) {
    history.pushState(null, "", path);
    this.render();
  }

  render() {
    const Component = this.routes[location.pathname] || this.routes["*"];
    if (!Component) return;

    if (this.current) {
      this.current.unmount?.();
    }

    this.current = new Component();
    this.root.innerHTML = "";
    this.root.appendChild(this.current.el);
  }

  destroy() {
    window.removeEventListener("popstate", this.onPopState);
  }
}

export default Router;
