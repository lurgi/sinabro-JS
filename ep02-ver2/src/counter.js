import bindReactiveState from "./reactivity";

export function setupCounter() {
  // const countMap = {};
  const countMap = bindReactiveState({
    name: "countMap",
    defaultValue: {},
  });

  const increase = ({ productId }) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 1;
    }
    const oldValue = countMap[productId];
    countMap[productId] = oldValue + 1;
    return countMap[productId];
  };

  const decrease = ({ productId }) => {
    if (countMap[productId] === undefined) {
      countMap[productId] = 0;
    } else countMap[productId] = Math.max(countMap[productId] - 1, 0);
    return countMap[productId];
  };

  const getTotalCount = () => {
    // let count = 0;
    // Object.values({ ...getCountMap() }).forEach((number) => {
    //   count += number;
    // });
    // return count;
    return 0;
  };

  const getCountBtProductId = ({ productId }) => {
    // return getCountMap()[productId] || 0;
    return 0;
  };

  return {
    increase,
    decrease,
    getTotalCount,
    getCountBtProductId,
  };
}
