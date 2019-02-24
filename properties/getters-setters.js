// определить для свойства объекта геттеры и сеттеры

// при создании самого объекта
let obj = {
    _value: 42,
    get value() {
        return this._value;
    },
    set value(newValue) {
        console.log("Нельзя перезаписать ответ на главный вопрос жизни, Вселенной и всего остального на ", newValue);
    }
}

obj.value; // 42
obj.value = 33; // Нельзя перезаписать ответ на главный вопрос жизни, Вселенной и всего остального на 33
obj.value; // 42

// через Object.defineProperty
Object.defineProperty(obj, 'max', {
    set: function(newValue) {
        if (!this._max || newValue > this._max) this._max = newValue;
    },
    get: function() {
        return this._max;
    }
});

obj.max; // undefined
obj.max = 100;
obj.max; // 100
obj.max = 5;
obj.max; // 100