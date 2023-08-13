export default function bindReactiveState({ name, defaultValue }) {
  if (typeof defaultValue !== "object") {
    throw Error("bindReactiveState supports only object");
  }

  let value = new Proxy(defaultValue, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, newValue) {
      const elements = Array.from(
        document.querySelectorAll(
          `[data-subscribe-to='${name}'][data-subscription-path='${prop}']`
        )
      );
      elements.forEach((element) => {
        if (element.tagName === "INPUT") element.value = newValue;
        else element.innerHTML = newValue;
      });
      target[prop] = newValue;
    },
  });

  // const getter = () => {
  //   return value;
  // };

  // const setter = (newValue) => {
  //   const oldKeys = Object.keys(value);
  //   const newKeys = Object.keys(newValue);
  //   const removedKeys = [];
  //   const changedKeys = [];
  //   newKeys.forEach((key) => {
  //     if (value[key] !== newValue[key]) {
  //       changedKeys.push(key);
  //     }
  //   });
  //   newKeys.forEach((key) => {
  //     if (!oldKeys.includes(key)) {
  //       changedKeys.push(key);
  //     }
  //   });

  //   const uniqueChangedKeys = [...new Set(changedKeys)];
  //   uniqueChangedKeys.forEach((key) => {

  //   });

  //   value = newValue;
  // };

  return value;
}
