function delay(time) {
    return new Promise(function(resolve, reject){
        console.log('call promise')
        setInterval(resolve, time);
    });
}

delay(1000)
.then(function(){
    console.log("after 1000ms");
    return delay(2000);
})
.then(function(){
    console.log("after another 2000ms");
})
.then(function() {
    console.log('test');
})
.then(function(){
    console.log("step 4 (next Job)");
    return delay(5000);
});