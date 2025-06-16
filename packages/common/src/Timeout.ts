export type Timeout = {
  callNow: () => void;
  cancel: () => void;
};

export function createTimeout(
  fn: (...args: any[]) => void,
  delay: number,
  ...args: any[]
): Timeout {
  let timeoutId = setTimeout(execute, delay, ...args);
  let called = false;

  function execute() {
    if (!called) {
      called = true;
      fn(...args);
    }
  }

  return {
    callNow: function () {
      clearTimeout(timeoutId);
      execute();
    },
    cancel: function () {
      clearTimeout(timeoutId);
    },
  };
}

export function createInterval(
  fn: (...args: any[]) => void,
  delay: number,
  ...args: any[]
): Timeout {
  let intervalId = setInterval(fn, delay, ...args);

  return {
    callNow: function () {
      fn(...args);
    },
    cancel: function () {
      clearInterval(intervalId);
    },
  };
}
