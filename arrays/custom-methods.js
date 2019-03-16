Array.prototype.isAllEqual = function() {
    return this.every(val => val === this[0]);
};
[1, 2, 3].isAllEqual(); // false
[1,1,1].isAllEqual(); // true


Array.prototype.toCSV = function(delimiter = ',') {
    return this.map(v => {
        return v.map(x => `"${x}"`)
            .join(delimiter);
    }).join('\n');
};
[['a', 'b'], ['c', 'd']].toCSV(); // "a","b"\n"c","d"


Array.prototype.bifurcate = function(filter) {
    return this.reduce((acc, val, i) => {
        let index = filter(val, i) ? 0 : 1;
        acc[index].push(val);
        return acc;
    }, [[], []]);
};
['beep', 'boop', 'foo', 'bar'].bifurcate(x => x[0] === 'b'); // [ ['beep', 'boop', 'bar'], ['foo'] ]


Array.prototype.chunk = function(size) {
    return Array.from(
        { length: Math.ceil(this.length / size) }, 
        (v, i) => this.slice(i * size, i * size + size)
    );
};
[1,2,3,4,5].chunk(2); // [[1,2], [3,4], [5]]


Array.prototype.compact = function() {
    return this.filter(Boolean);
}
[0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34].compact(); // [ 1, 2, 3, 'a', 's', 34 ]


