Array.prototype.compact = function () {
    return this.filter(Boolean);
}
let compact = [0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34].compact(); // [ 1, 2, 3, 'a', 's', 34 ]

// console.log(compact)

Array.prototype.everyNth = function (nth = 1) {
    return this.filter((el, ind) => ind % nth === nth - 1);
}
let everySecond = [1, 2, 3, 4, 5, 6].everyNth(2); // [ 2, 4, 6 ]

//console.log(everySecond)

Array.prototype.filterNonUnique = function () {
    return this.filter(el => {
        return this.indexOf(el) === this.lastIndexOf(el);
    })
}
let onlyUnique = [1, 2, 2, 3, 4, 4, 5].filterNonUnique(); // [1, 3, 5]

// console.log(onlyUnique)

Array.prototype.maxN = function (n = 1) {
    return [...this]
        .sort((a, b) => b - a)
        .slice(0, n);
}
let maxOne = [1, 2, 3].maxN(); // [3]
let maxTwo = [1, 2, 3].maxN(2); // [3, 2]

// console.log(maxOne);
// console.log(maxTwo);

Array.prototype.minN = function (n = 1) {
    return [...this]
        .sort((a, b) => a - b)
        .slice(0, n);
}
let minOne = [1, 2, 3].minN(); // [1]
let minTwo = [1, 2, 3].minN(2); // [1, 2]

// console.log(minOne);
// console.log(minTwo);

Array.prototype.reducedFilter = function (keys, fn) {
    return this.filter(fn)
        .map(el => {
            return keys.reduce((acc, key) => {
                acc[key] = el[key];
                return acc;
            }, {});
        });
}
let data = [
    { id: 1, name: 'john', age: 24 },
    { id: 2, name: 'mike', age: 40 },
];
let reduced = data.reducedFilter(['id', 'name'], item => item.age > 24);
// [{ id: 2, name: 'mike'}]

// console.log(reduced);