import fs from "fs";
import util from "util";

fs.readFile("package.json", (error, file) => {
  console.log("✨result");
  console.log(file.toString());
});

//위 코드를 프로미스로 만들기 (프로미스화, Promisify)
function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, file) => {
      if (error) {
        reject(error);
      } else {
        resolve(file);
      }
    });
  });
}

async function main() {
  try {
    const file = await readFilePromise("package.json");
    console.log("✨It's Promise result!");
    console.log(file.toString());
  } catch (err) {
    console.log(err);
  }
}
main();

//프로미스화 해주는 메서드를 이용한 방식
const readFilePromise2 = util.promisify(fs.readFile);

async function main2() {
  try {
    const file = await readFilePromise2("package.json");
    console.log("✨It's second Promise result!");
    console.log(file.toString());
  } catch (err) {
    console.log(err);
  }
}
main2();
