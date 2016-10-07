/*------------------------------------------------*/
// Conditional Statements
/*------------------------------------------------*/

// if else
//see if conditions meet.
var inventory = ['chair', 'table', 'stool'];
var userCredit = true;

// Same logical operators as other programming languages:
// &&, !, ||
if(inventory.length > 0 && userCredit) {
  console.log('conditions met');
} else {
  console.log('Sale could not go through');
}

// switch
//checking different cases of one condition
var difficulty = 'medium';
switch(difficulty) {
  case 'hard':
    console.log('wow');
    break;
  case 'medium':
    console.log('that\'s a bit easier...');
    break;
  default:
    console.log('easy, alright');
}

// Short for if / else:
var isClicked = true;
var isOpen = isClicked ? true : false;
console.log('Is it open? ' + isOpen);
// same as:
// var isOpen;
// if(isClicked === true) {
//   isOpen = true;
// } else {
//   isOpen = false;
// }


/*------------------------------------------------*/
// Debug
/*------------------------------------------------*/
// define error cases in functions.
// Throw an error "object" when things go wrong. We will catch 'em later.
// Error objects have "name" and "message" that we can use to log.
var numberException = {
  name : 'Number Exception',
  message : 'Oh snap! Dude. put numbers in.'
}

// isNaN = is Not a Number
function add(input1, input2) {
  if(!isNaN(input1) && !isNaN(input2)) {
    return input1 + input2;
  } else {
    throw numberException;
    // It'll break the execution from here on
  }
}

// Try and catch
// This is a better way to handle errors.
// Error objects have "name" and "message" that we can use to log.
try {
  add('bogus', 'bananas');
} catch(e) {
  console.log('Caught error:', e.name, ' with message: ', e.message);
  moveOn();
}

function moveOn(){
  console.log('Ok, let\s move on');
}

