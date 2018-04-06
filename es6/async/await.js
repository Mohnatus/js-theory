var request1 = new Promise(function(resolve, reject) {
  resolve(21);
});
var request2 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(75);
  }, 1000);
});

async function loadData() {
    var promise1 = request1;
    var promise2 = request2;
   
    // В данный момент выполняются оба запроса
    // и нам нужно подождать их завершения.
    var response1 = await promise1;
    var response2 = await promise2;
    return response1 + ' ' + response2;
}
// Так как мы больше не в функции, объявленной с ключевым словом `async`
// нам нужно использовать `then` с возвращённым объектом Promise
loadData().then((data) => console.log('Done', data));