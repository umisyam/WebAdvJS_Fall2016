/*------------------------------------------------*/
// Iteration
/*------------------------------------------------*/

// For loop
//on arrays:
var courses = ['thesis', 'webJS', 'pcomp'];

for( var i = 0; i < courses.length; i++ ){
  console.log(courses[i]);
}

//on objects
var thesis = {
  credits : 6,
  type : 'core',
  register : function() {
    login();
    enterData();
    submit();
  }
};

for( var i in thesis ) {
  console.log(i, ' : ', thesis[i]);
}


// While loop
var courses = ['thesis', 'webJS', 'pcomp'],
  i = courses.length - 1;

while(i > -1){
  console.log(courses[i]);
  i --;
}
/* or, alternatively */
var i = courses.length;
while(i --){
  console.log(courses[i]);
}


// do while
// like while. But runs at least once
var courses = ['thesis', 'webJS', 'pcomp'],
  i = courses.length - 1;

do {
  console.log(courses[i]);
  i --;
} while(i > -1);

