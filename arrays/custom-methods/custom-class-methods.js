Array.createMatrix = (width, height, val = null) => {
    return Array.from({ length: height })
        .map(() => Array.from({ length: width }).fill(val));
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

Array.zip = function (...arrays) {
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