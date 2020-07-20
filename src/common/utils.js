//函数防抖动(解决上拉加载频繁滚动频繁请求服务器导致服务器负载重)
export function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
