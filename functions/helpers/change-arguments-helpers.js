// делает первый аргумент функции последним

const flip = fn => (first, ...rest) => fn(...rest, first);

let a = { name: 'John Smith' };
let b = {};
const mergeFrom = flip(Object.assign);
// Object.assign должен скопировать свойства из b в a и вернуть a
let mergePerson = mergeFrom.bind(null, a);
// но аргументы меняются местами
let c = mergePerson(b); // == b
//console.log(c == b);
// то же самое - другой порядок аргументов 
b = {};
c = Object.assign(b, a); // == b
// console.log(c == b);


// изменяет аргументы при вызове 

const overArgs = (fn, transforms) => {
    return (...args) => {
        args = args.map((val, i) => transforms[i](val));
        return fn(...args);
    }
}
const square = n => n * n;
const double = n => n * 2;
const fn = overArgs((x, y) => [x, y], [square, double]);
let fnWithTransformedArgs =  fn(9, 3); // [81, 6]
//console.log(fnWithTransformedArgs);


// изменяет порядок аргументов

const rearg = (fn, indexes) => 
        (...args) => 
            fn(...indexes.map(i => args[i]));

const rearged = rearg(
    function (a, b, c) {
        return [a, b, c];
    },
    [2, 0, 1]
);
let res1 = rearged('b', 'c', 'a'); // ['a', 'b', 'c']
//console.log(res1);
