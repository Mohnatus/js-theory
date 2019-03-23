// фиксирует имя метода, который нужно вызвать, и аргументы для него

const call = (key, ...args) => {
    return (context) => {
        return context[key](...args);
    }
};

Promise.resolve([1, 2, 3])
    .then(call('map', x => 2 * x))
    .then(/*console.log*/); // [ 2, 4, 6 ]

const map = call.bind(null, 'map');
Promise.resolve([1, 2, 3])
    .then(map(x => 2 * x))
    .then(/*console.log*/); // [ 2, 4, 6 ]


// фиксирует несколько функций
// вызывает каждую из них с набором аргументов

const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));

const minMax = over(Math.min, Math.max);
let resultsArray = minMax(1, 2, 3, 4, 5); // [1,5]
//console.log(resultsArray);



// заменяет коллбэки на промисы
const promisify = func => {
    return (...args) => {
        // при вызове функции с аргументами создаем промис
        return new Promise((resolve, reject) => {
            // в котором вызываем эту асинхронную функцию
            // с аргументами и коллбэком
            return func(
                ...args, 
                (err, result) => (err ? reject(err) : resolve(result))
            )
        });
    }
}

const asyncFoo = (d, cb) => setTimeout(cb, d);
const delay = promisify(asyncFoo);

// коллбэк теперь в методе then
delay(2000).then(() => console.log('Hi!')); // // Promise resolves after 2s

