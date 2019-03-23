const pipeAsyncFunctions = (...fns) => {
    // фиксируем функции
    return arg => {
        // получаем аргументы при вызове

        // начинаем асинхронную цепочку
        let initial = Promise.resolve(arg);
        // связываем функции в цепочку (от первой до последней)
        let reduceHandler = (p, f) => p.then(f);
        return fns.reduce(reduceHandler, initial);
    }
}

const sum = pipeAsyncFunctions(
    x => x + 1,
    x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
    x => x + 3,
    async x => (await x) + 4,
    x => console.log(x)
);

(async () => {
    await sum(5); // 15 (after one second)
})();


const pipeFunctions = (...fns) => {
    let reduceHandler = (f, g) => {
        // g - следующая функция

        // возвращаем новую функцию, которая примет аргументы
        // выполнит предыдущую функцию с ними
        // и вызовет следующую функцию с полученным результатом
        return (...args) => {
            return g(f(...args));
        }
    }

    return fns.reduce(reduceHandler);
}

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5, console.log.bind(console));
multiplyAndAdd5(5, 2); // 15
    