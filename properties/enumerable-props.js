// Все свойства, которые мы добавляем в объект по умолчанию перечисляемые
// это значит, что они будут участвовать в цикле for/in
// встроенные свойства и методы неперечисляемые 
// например, toString, который наследуется из самого Object.prototype не вылезает ни в одном цикле

let john = {
    name: 'John'
};
john.lastname = 'Doe';

for (let prop in john) {
    console.log(prop);
}

// name, lastname

// Свойства можно добавлять в объект через метод Object.defineProperty
// первый параметр - объект, в который добавляется свойство
// второй параметр - имя свойства
// третий параметр - объект с настройками свойства

Object.defineProperty(john, 'hiddenProperty', {
    enumerable: false,
    value: 'Это свойство не видно в цикле for-in'
});

john.hiddenProperty; // Это свойство не видно в цикле for-in
for (let prop in john) {
    console.log(prop);
}
// name, lastname

// hiddenProperty - это личное свойство объекта john
// хоть оно не перечисляется в цикле, 
// но по-прежнему можно его проверить оператором in или методом hasOwnProperty

'hiddenProperty' in john; // true
john.hasOwnProperty('hiddenProperty'); // true



