// 동기
console.log("hello")
console.log("world")

// 비동기
setTimeout(() =>
    console.log("world2"), 4000); //1초 뒤에 출력
console.log("world2")