// в цепочке прототипов (от Object.prototype до конкретного объекта) реализация методов и определение свойств может меняться

Object.defineProperty(Object.prototype, 'exampleFoo', {
    value: function() {
        console.log('Object Prototype');
    }
});

let obj1 = {};
obj1.exampleFoo(); // Object Prototype

let anotherPrototype = {
    exampleFoo: function() {
        console.log('Another Object Prototype');
    }
};
Object.getPrototypeOf(anotherPrototype) == Object.prototype; // true
let obj2 = Object.create(anotherPrototype);
obj2.exampleFoo(); // Another Object Prototype

// Интерфейс остался тем же самым, но реализация поменялась
// Какая именно строка будет выведена в консоль зависит от того,
// в контексте какого объекта вызывается метод

// это и называется полиморфизмом
// свойство вроде одно и то же, но ведет себя по-разному в разных ситуациях

// таким переопределением активно пользуются встроенные типы данных языка
// например, массивы переопределяют метод toString, чтобы выводить более полезную информацию о себе


// полиморфизм не обязательно связан с наследованием
// его можно использовать и другими способами

