'use strict';

var fetchData = new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject('new value');
    }, 1000);
  })
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.log('error', err);
  });

