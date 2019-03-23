Array.prototype.bifurcate = function (filter) {
    return this.reduce((acc, val, i) => {
        let index = filter(val, i) ? 0 : 1;
        acc[index].push(val);
        return acc;
    }, [[], []]);
};
let bifurcateArr = ['beep', 'boop', 'foo', 'bar'].bifurcate(x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]

// console.log(bifurcateArr)

Array.prototype.chunk = function (size) {
    return Array.from(
        { length: Math.ceil(this.length / size) },
        (v, i) => this.slice(i * size, i * size + size)
    );
};
let chunk = [1, 2, 3, 4, 5].chunk(2); // [[1,2], [3,4], [5]]

// console.log(chunk)

Array.prototype.countBy = function (fn) {
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

Array.prototype.groupBy = function (fn) {
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