'use strict';

function sum(xPromise, yPromise) {
  return Promise.all([xPromise, yPromise])
    .then(function(values) { return values[0] + values[1]; })
}

var fetchX = function() {
  var x = 20;
  return new Promise(function(res, rej) {
    setTimeout(function() {
      res(x);
    }, 1000);
  });
};

var fetchY = function() {
  var y = 50;
  return new Promise(function(res, rej) {
    setTimeout(function() {
      res(y);
    }, 1500);
  });
};

sum(fetchX(), fetchY())
  .then(function(data) {
    console.log(data);
  })

// then на самом деле работает со вторым возвращённым промисом, 
// а не с тем, который создан командой Promise.all([ ... ]). 
// Кроме того, хотя мы не присоединяем других вызовов ко второму then(…), 
// он тоже создаёт ещё один промис, с которым, если надо, вполне можно продолжить работу. 
// Как результат, мы получаем возможность объединения вызовов .then(…) в цепочки.
