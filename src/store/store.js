/**
 *
 * zustand 같은 상태관리를 구현합니다.
 * 상태저장, 구독, 상태 변경 감지
 */

class Store {
  constructor(initialState) {
    this.state = this.makeObservable(initialState);
    this.currentObserver = null;
  }

  observe(action) {
    console.log("observe, action", action);
    this.currentObserver = this.debounceFrame(action);
    action();
    this.currentObserver = null;
  }

  makeObservable(state) {
    const stateKeys = Object.keys(state);

    for (const key of stateKeys) {
      let value = state[key];
      const observers = new Set();

      Object.defineProperty(state, key, {
        get: () => {
          if (this.currentObserver) {
            observers.add(this.currentObserver);
          }
          return value;
        },
        set: (val) => {
          console.log("observer:", observers);
          if (value === val) return; // 같은 값
          value = val;
          observers.forEach((observer) => observer());
        },
      });
    }
    return state;
  }

  debounceFrame(callback) {
    let currentCallback = -1;
    return () => {
      cancelAnimationFrame(currentCallback);
      currentCallback = requestAnimationFrame(callback);
    };
  }
}

export default Store;
