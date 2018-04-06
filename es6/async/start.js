// Это - самая обыкновенная JS-функция
function getNumber1() {
    return Promise.resolve('374');
}
// Эта функция делает то же самое, что и getNumber1
async function getNumber2() {
    return 374;
}

// Функции, которые выдают исключения, аналогичны функциям, которые возвращают отклонённые промисы:

function f1() {
    return Promise.reject('Some error');
}
async function f2() {
    throw 'Some error';
}

getNumber1().then(function(data) {
  console.log(data)
})

getNumber2().then(function(data) {
  console.log(data)
})

f1().then(function(data) {}, function(err) { console.log (err); })
f2().then(function(data) {}, function(err) { console.log (err); })