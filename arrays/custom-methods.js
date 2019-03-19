Array.prototype.isAllEqual = function() {
    return this.every(val => val === this[0]);
};
let isEqual1 = [1, 2, 3].isAllEqual(); // false
let isEqual2 = [1,1,1].isAllEqual(); // true

// console.log(isEqual1)
// console.log(isEqual2)

Array.prototype.toCSV = function(delimiter = ',') {
    return this.map(v => {
        return v.map(x => `"${x}"`)
            .join(delimiter);
    }).join('\n');
};
let arrToCSV = [['a', 'b'], ['c', 'd']].toCSV(); // "a","b"\n"c","d"

// console.log(arrToCSV)

Array.prototype.bifurcate = function(filter) {
    return this.reduce((acc, val, i) => {
        let index = filter(val, i) ? 0 : 1;
        acc[index].push(val);
        return acc;
    }, [[], []]);
};
let bifurcateArr = ['beep', 'boop', 'foo', 'bar'].bifurcate(x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]

// console.log(bifurcateArr)

Array.prototype.chunk = function(size) {
    return Array.from(
        { length: Math.ceil(this.length / size) }, 
        (v, i) => this.slice(i * size, i * size + size)
    );
};
let chunk = [1,2,3,4,5].chunk(2); // [[1,2], [3,4], [5]]

// console.log(chunk)

Array.prototype.compact = function() {
    return this.filter(Boolean);
}
let compact = [0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34].compact(); // [ 1, 2, 3, 'a', 's', 34 ]

// console.log(compact)

Array.prototype.countBy = function(fn) {
    let handler = typeof fn === 'function' ? fn : (val) => val[fn];
    return this.map(handler)
        .reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {})
};
let countByFloor = [6.1, 4.2, 6.3].countBy(Math.floor); // {4: 1, 6: 2}
let countByLength = ['one', 'two', 'three'].countBy('length'); // {3: 2, 5: 1}

// console.log(countByFloor)
// console.log(countByLength)

Array.prototype.deepFlatten = function() {
    let handler = el => Array.isArray(el) ? el.deepFlatten() : el;
    return [].concat(...this.map(handler));
}
let flatten = [1, [2], [[3], 4], 5].deepFlatten();

// console.log(flatten)

Array.prototype.everyNth = function(nth = 1) {
    return this.filter((el, ind) => ind % nth === nth - 1);
}
let everySecond = [1, 2, 3, 4, 5, 6].everyNth(2); // [ 2, 4, 6 ]

//console.log(everySecond)

Array.prototype.filterNonUnique = function() {
    return this.filter(el => {
        return this.indexOf(el) === this.lastIndexOf(el);
    })
}
let onlyUnique = [1, 2, 2, 3, 4, 4, 5].filterNonUnique(); // [1, 3, 5]

// console.log(onlyUnique)

Array.prototype.flatten = function(depth = 1) {
    let handler = el => depth > 1 && Array.isArray(el) ? el.flatten(depth - 1) : el;
    return this.reduce((acc, el) => acc.concat(handler(el)), []);
}
let flatten1 = [1, [2], 3, 4].flatten(); // [1, 2, 3, 4]
let flatten2 = [1, [2, [3, [4, 5], 6], 7], 8].flatten(2); // [1, 2, 3, [4, 5], 6, 7, 8]

// console.log(flatten1)
// console.log(flatten2)

Array.prototype.groupBy = function(fn) {
    let mapHandler = typeof fn === 'function' ? fn : (val) => val[fn];
    let reduceHandler = (acc, val, i) => {
        acc[val] = (acc[val] || []).concat(this[i]);
        return acc;
    }
    return this.map(mapHandler).reduce(reduceHandler, {});
}
let groupByFloor = [6.1, 4.2, 6.3].groupBy(Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
let groupByLength = ['one', 'two', 'three'].groupBy('length'); // {3: ['one', 'two'], 5: ['three']}

// console.log(groupByFloor)
// console.log(groupByLength)

Array.createMatrix = (width, height, val = null) => {
    return Array.from({ length: height })
        .map(() => Array.from({length: width}).fill(val));
}
let matrix = Array.createMatrix(2, 2, 0); // [[0, 0], [0, 0]]

Array.fromRange = (end, start = 0, step = 1) => {
    let length = Math.ceil((end - start + 1) / step);
    return Array.from(
        { length: length }, 
        (el, ind) => ind * step + start
    );
}
let arrFromRange1 = Array.fromRange(5); // [0,1,2,3,4,5]
let arrFromRange2 = Array.fromRange(7, 3); // [3,4,5,6,7]
let arrFromRange3 = Array.fromRange(9, 0, 2); // [0,2,4,6,8]

Array.createNDArray = (val, ...args) => {
    if (args.length === 0) return val;

    let handler = () => Array.createNDArray(val, ...args.slice(1));
    return Array.from({ length: args[0] }).map(handler);
}

let oneDArray = Array.createNDArray(1, 3); // [1,1,1]
let threeDArray = Array.createNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]

// console.log(oneDArray)
// console.log(threeDArray)


