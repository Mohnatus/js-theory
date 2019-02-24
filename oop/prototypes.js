// Главный прототип Object.prototype
Object.getPrototypeOf({}) == Object.prototype; // true
Object.getPrototypeOf(Object.prototype); // null

// Прототипом может быть другой объект
Object.getPrototypeOf(isNaN) == Function.prototype; // true
Object.getPrototypeOf([]) == Array.prototype; // true

// Создание объекта с заданным прототипом
let john = Object.create({
    name: 'John', 
    speak: function() { console.log('My name is ' + this.name); }
});

// Удобный способ для создания множества объектов с некоторым прототипом -- конструктор
function Man(name) {
    this.name = name;
}
let john = new Man('John');

// Все функции, в том числе и конструкторы, имеют свой прототип
// он всегда равен Function.prototype

// кроме того у функций есть свойство prototype - Man.prototype
// это НЕ прототип самой функции
// это объект, который будет служить прототипом для тех объектов, которые создаст эта функция в качестве конструктора

// то есть если функция вызвана с new, она превращается в конструктор и создает новый объект
// прототипом этого объекта будет то, что лежит в свойстве prototype этой функции-конструктора

Man.prototype.speak = function() {
    console.log('My name is ' + this.name);
}
john.speak(); // My name is John

Object.getPrototypeOf(john) == Man.prototype; // true

// кроме того из прототипа этого объекта можно будет узнать, какой функцией-конструктором он был создан

Object.getPrototypeOf(john).constructor == Man; // true

