// Свойство можно добавить непосредственно в объект, или в его прототип

function Man(name) {
    this.name = name;
}
Man.prototype.speak = function() { 
    console.log('My name is ' + this.name);
}

let john = new Man('John');
let bill = new Man('Bill');

// добавление свойства непосредственно Джону не повлияет на Билла
john.favoriteColor = 'pink';
bill.favoriteColor; // undefined

// Добавление свойства в прототип повлияет и на Билла, и на Джона
// так как прототип у них общий
Man.prototype.favoriteFlower = 'sunflower';

john.favoriteFlower; // sunflower
bill.favoriteFlower; // sunflower

// При этом личные свойства объекта переопределяют свойства с тем же именем из прототипа
Man.prototype.gender = 'male';
john.gender = 'elf';
console.log(john.gender); // elf

// проверить, определено ли свойство непосредственно в объекте или только в его прототипе
// можно с помощью метода obj.hasOwnProperty()

john.hasOwnProperty('favoriteColor'); // true
john.hasOwnProperty('favoriteFlower'); // false
