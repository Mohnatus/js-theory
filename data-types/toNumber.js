
Number('123')
Number('123')   // явное преобразование
+'123'          // неявное преобразование
123 != '456'    // неявное преобразование
4 > '5'         // неявное преобразование
5/null          // неявное преобразование
true | 0        // неявное преобразование

Number(null)                   // 0
Number(undefined)              // NaN
Number(true)                   // 1
Number(false)                  // 0
Number(" 12 ")                 // 12
Number("-12.34")               // -12.34
Number("\n")                   // 0
Number(" 12s ")                // NaN
Number(123)                    // 123


// При применении оператора == к null или undefined преобразования в число не производится. 
// Значение null равно только null или undefined и не равно ничему больше.

null == 0               // false, null не преобразуется в 0
null == null            // true
undefined == undefined  // true
null == undefined       // true


// Значение NaN не равно ничему, включая себя.