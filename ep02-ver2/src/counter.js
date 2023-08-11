import bindReactiveState from "./reactivity";

export function setupCounter() {
  // const countMap = {};
  const [getCountMap, setCountMap] = bindReactiveState({
    name: "countMap",
    defaultValue: {},
  });

  const increase = ({ productId }) => {
    const newCountMap = { ...getCountMap() };
    if (newCountMap[productId] === undefined) {
      newCountMap[productId] = 0;
    }
    newCountMap[productId] += 1;
    setCountMap(newCountMap);
    return newCountMap[productId];
  };

  const decrease = ({ productId }) => {
    const newCountMap = { ...getCountMap() };
    if (newCountMap[productId] === undefined) {
      newCountMap[productId] = 0;
    }
    newCountMap[productId] -= 1;
    setCountMap(newCountMap);
    return newCountMap[productId];
  };

  const getTotalCount = () => {
    let count = 0;
    Object.values({ ...getCountMap() }).forEach((number) => {
      count += number;
    });
    return count;
  };

  const getCountBtProductId = ({ productId }) => {
    return getCountMap()[productId] || 0;
  };

  return {
    increase,
    decrease,
    getTotalCount,
    getCountBtProductId,
  };
}
