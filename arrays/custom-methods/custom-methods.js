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









Array.prototype.deepFlatten = function() {
    let handler = el => Array.isArray(el) ? el.deepFlatten() : el;
    return [].concat(...this.map(handler));
}
let flatten = [1, [2], [[3], 4], 5].deepFlatten();

// console.log(flatten)

Array.prototype.flatten = function(depth = 1) {
    let handler = el => depth > 1 && Array.isArray(el) ? el.flatten(depth - 1) : el;
    return this.reduce((acc, el) => acc.concat(handler(el)), []);
}
let flatten1 = [1, [2], 3, 4].flatten(); // [1, 2, 3, 4]
let flatten2 = [1, [2, [3, [4, 5], 6], 7], 8].flatten(2); // [1, 2, 3, [4, 5], 6, 7, 8]

// console.log(flatten1)
// console.log(flatten2)





Array.prototype.offset = function(offset) {
    return [
        ...this.slice(offset),
        ...this.slice(0, offset)
    ]
}
let offset1 = [1, 2, 3, 4, 5].offset(2); // [3, 4, 5, 1, 2]
let offset2 = [1, 2, 3, 4, 5].offset(-2); // [4, 5, 1, 2, 3]

// console.log(offset1);
// console.log(offset2);

Array.prototype.permutations = function() {
    if (this.length < 2) {
        return this;
    }

    if (this.length === 2) {
        return [
            this, 
            [this[1], this[0]]
        ];
    } 

    return this.reduce((acc, item, i) => {
        let otherEls = [...this.slice(0, i), ...this.slice(i + 1)];
        let otherElsPermutations = otherEls.permutations();
        let allItemPermutations = otherElsPermutations.map(val => [item, ...val]);
        return acc.concat(allItemPermutations);
    }, []);
}
let permutations = [1, 33, 5].permutations(); 
// [ [ 1, 33, 5 ], [ 1, 5, 33 ], [ 33, 1, 5 ], 
// [ 33, 5, 1 ], [ 5, 1, 33 ], [ 5, 33, 1 ] ]

// console.log(permutations);


Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
}
let randomEl = [3, 7, 9, 11].random();

// console.log(randomEl);

Array.prototype.shuffle = function() {
    let arr = [...this];
    let m = this.length;
    while(m) {
        const i = Math.floor(Math.random() * m--);
        [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr; 
}
let origin = [1, 2, 3];
let shuffle = origin.shuffle();

// console.log(origin, shuffle);

Array.prototype.sortedIndexFor = function(n) {
    const isDescending = this[0] > this[this.length - 1];
    const index = this.findIndex(el => (isDescending ? n >= el : n <= el));
    return index === -1 ? this.length : index;
}
let sortedIndex1 = [5, 3, 2, 1].sortedIndexFor(4); // 1
let sortedIndex2 = [30, 50].sortedIndexFor(40); // 1

// console.log(sortedIndex1);
// console.log(sortedIndex2);

Array.prototype.stableSort = function(compare) {
    return this
        .map((item, index) => ({item, index}))
        .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
        .map(({item}) => item);
}
let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let stable = arr.stableSort(() => 0); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// console.log(stable);

Array.prototype.unzip = function() {
    let reduceHandler = (acc, val) => {
        val.forEach((v, i) => acc[i].push(v));
        return acc;
    };
    let initial = Array.from({
        length: Math.max(...this.map(x => x.length))
    }).map(x => []);
    return this.reduce(reduceHandler, initial);
}
let unzip1 = [['a', 1, true], ['b', 2, false]].unzip();
// [['a', 'b'], [1, 2], [true, false]]
let unzip2 = [['a', 1, true], ['b', 2]].unzip();
// [['a', 'b'], [1, 2], [true]]

// console.log(unzip1);
// console.log(unzip2);

Array.prototype.xProd = function(arr) {
    return this.reduce((acc, x) => {
        return acc.concat(
            arr.map(y => [x, y])
        );
    }, []);
}
let xProd = [1, 2].xProd(['a', 'b']); 
// [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

// console.log(xProd);



