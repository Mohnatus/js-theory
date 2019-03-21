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

// console.log(matrix)

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

// console.log(arrFromRange1);
// console.log(arrFromRange2);
// console.log(arrFromRange3);

Array.createNDArray = (val, ...args) => {
    if (args.length === 0) return val;

    let handler = () => Array.createNDArray(val, ...args.slice(1));
    return Array.from({ length: args[0] }).map(handler);
}
let oneDArray = Array.createNDArray(1, 3); // [1,1,1]
let threeDArray = Array.createNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]

// console.log(createNDArray);

Array.prototype.maxN = function(n = 1) {
    return [...this]
        .sort((a, b) => b - a)
        .slice(0, n);
}
let maxOne = [1, 2, 3].maxN(); // [3]
let maxTwo = [1, 2, 3].maxN(2); // [3, 2]

// console.log(maxOne);
// console.log(maxTwo);

Array.prototype.minN = function(n = 1) {
    return [...this]
        .sort((a, b) => a - b)
        .slice(0, n);
}
let minOne = [1, 2, 3].minN(); // [1]
let minTwo = [1, 2, 3].minN(2); // [1, 2]

// console.log(minOne);
// console.log(minTwo);

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

Array.prototype.reducedFilter = function(keys, fn) {
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

Array.zip = function(...arrays) {
    const maxLength = Math.max(...arrays.map(x => x.length));
    return Array.from({ length: maxLength }).map((_, i) => {
        return Array.from({ length: arrays.length }, (_, k) => arrays[k][i]);
    });
}
let zip1 = Array.zip(['a', 'b'], [1, 2], [true, false]); 
// [['a', 1, true], ['b', 2, false]]
let zip2 = Array.zip(['a'], [1, 2], [true, false]); 
// [['a', 1, true], [undefined, 2, false]]

// console.log(zip1, zip2);

