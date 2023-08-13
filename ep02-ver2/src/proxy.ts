// Proxy 패턴

//Subject 인터페이스
interface Payment {
  request(amount: number): void;
}
//Real Subject 실체객체
class Cash implements Payment {
  request(amount: number): void {
    console.log(`결제요청 완료... 금액 : ${amount}`);
  }
}
const targetObject = new Cash();
//Proxy
const paymentProxy = new Proxy(targetObject, {
  get: (object, prop) => {
    if (prop === "request") return object[prop];
    throw new Error("operation not implemented");
  },
});

// paymentProxy.request(100)
// paymentProxy.add(100)
