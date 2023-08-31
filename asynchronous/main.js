//promise 구문
fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

//awiat async 구문
async function main() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
main();

//promise 사용법
function returnPromise() {
  return new Promise((resolve, reject) => {
    resolve(4); //성공한 결과는 resolve에, 에러는 reject에 담아서 보낸다.
  });
}

async function main2() {
  const promise = returnPromise();
  const result = await promise; //promise구문을 await 하면 response가 된다.
  console.log(result); //4
}
main2();

//비동기적인 setTimeout 만들기
function printDelayedMessage(message, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(message);
      resolve();
    }, timeout);
  });
}

async function main3() {
  console.log("before resolving promise");
  await printDelayedMessage("hi", 1000);
  console.log("after resolving promise");
}
main3();

//mutiple promise
async function getTodo(number) {
  if (number === 2) throw new Error("❌ERROR!");
  return await fetch(`https://jsonplaceholder.typicode.com/todos/${number}`);
}

const promise1 = getTodo(1);
const promise2 = getTodo(2);
const promise3 = getTodo(3);

const responses = await Promise.allSettled([promise1, promise2, promise3]);
console.log({ responses });
// const jsons = await Promise.all(responses.map((response) => response.json()));
// console.log({ jsons });
