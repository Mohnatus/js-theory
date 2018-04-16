import {one, two} from './nums';
console.log(`Sum: ${one + two}`);
let sum = one + two;
document.addEventListener('click', function() {
  console.log(++sum);
});