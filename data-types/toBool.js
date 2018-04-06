Boolean(2)
if (2) {}

// операторы, вроде || и && выполняют преобразование значений к логическому типу для внутренних целей, а возвращают значения исходных операндов, даже если они не являются логическими
!!2
2 || 'Hello'
let x = 'hello' && 123;   // x === 123


Boolean('')           // false
Boolean(0)            // false     
Boolean(-0)           // false
Boolean(NaN)          // false
Boolean(null)         // false
Boolean(undefined)    // false
Boolean(false)        // false

Boolean({})             // true
Boolean([])             // true
Boolean(Symbol())       // true
!!Symbol()              // true
Boolean(function() {})  // true