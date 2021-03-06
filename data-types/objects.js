// При преобразовании в число сначала вызывается valueOf (3), если результат получить не удаётся — вызывается toString (2). При преобразовании в строку используется обратная последовательность действий — сначала вызывается toString (2), а в случае неудачи вызывается valueOf (3).

// Большинство встроенных типов не имеют метода valueOf, или имеют valueOf, который возвращает сам объект, для которого он вызван (this), поэтому такое значение игнорируется, так как примитивом оно не является. Именно поэтому преобразование в число и в строку может работать одинаково — и то и другое сводится к вызову toString().

// Object рассматривает приведение к числу как преобразование по умолчанию, поэтому использует сначала метод valueOf() а не toString()

let d = new Date();
// получение строкового представления
let str = d.toString();  // 'Wed Jan 17 2018 16:15:42'
// получение числового представления, то есть - числа миллисекунд с начала эпохи Unix
let num = d.valueOf();   // 1516198542525
// сравнение со строковым представлением
// получаем true так как d конвертируется в ту же строку
console.log(d == str);   // true

// сравнение с числовым представлением
// получаем false, так как d не преобразуется в число с помощью valueOf()
console.log(d == num);   // false

// Результат 'Wed Jan 17 2018 16:15:42Wed Jan 17 2018 16:15:42'
// '+', так же, как и '==', вызывает режим преобразования по умолчанию
console.log(d + d);

// Результат 0, так как оператор '-' явно вызывает преобразование в число, а не преобразование по умолчанию
console.log(d - d);


/* ------------------------- */
// переопределение методов
var obj = {
  prop: 101,
  toString(){
    return 'Prop: ' + this.prop;
  },
  valueOf() {
    return this.prop;
  }
};

console.log(String(obj));  // 'Prop: 101'
console.log(obj + '')      // '101'
console.log(+obj);         //  101
console.log(obj > 100);    //  true
