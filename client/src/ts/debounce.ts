/**
 * Debounce search requests in order to improve performance
 * @param {any} function
 * @param {number} wait - time to wait in milliseconds before invoking search
 * @return {function} - as long as it continues to be invoked the function will not be triggered.
 */
const debounce = (func: any, wait: number) => {
  let timeout: any;

  return function executedFunction(...args: any) {
    // callback to be executed
    const later = () => {
      timeout = null; // indicate the debounce ended
      func(...args); // execute the callback
    };

    clearTimeout(timeout); // on every function execution
    timeout = setTimeout(later, wait); // restart the waiting period timeout
  };
};

export default debounce;
