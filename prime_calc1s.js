
/*
student version with NO assertion tests or refactoring implemented
*/
const max = 1000;   // Set upper bounds
const min = 0;      // Set lower bounds
let check4prime;    // global object

class Check4Prime {
    /*
    Calculates prime numbers and put true or false in an array
    */
    primeCheck(num) {

        const prime = localStorage.getItem("primes")

        if(prime !== null && prime !== '')
        {
        // Localstorage
        console.log("Primes already generated");
        var existing_primes = JSON.parse(prime);
        var num_primes = existing_primes.length;
        var primes = [];
        for(var i=0;i< num_primes;i++)
        {
            primes.push(existing_primes[i]);
        }
        }   else {       
        // No localstorage - make array
        console.log("Generating primes array");
        var isPrime = n => Array(Math.ceil(Math.sqrt(n)+1)).fill().map((e,i)=>i).slice(2).every(m => n%m);
        var primes = Array(max).fill().map((e,i)=>i+1).slice(1).filter(isPrime); primes.unshift(2);
        localStorage.setItem("primes", JSON.stringify(primes));
    }

        // Check input against prime array
        var val = parseInt(num);
        let checkprimes = JSON.parse(localStorage.getItem("primes"));
        var lookarray = checkprimes.indexOf(val);
        if (lookarray > -1) {
            // is in array
            return true;
        } else {
            // is not in array
            return false;
        }
    }


    /*
    Method to validate input
    */
    checkArgs(num) {
        
/*         for (var i=0; i < num.length; i++)
            console.log(num[i]);  */
        
        // Initialize check and prime array
        assert(check4prime.primeCheck(num), 'Test if ' + num +' is a prime')
        // Check arguments for correct number of parameters if not throw new Error();
        if(test_Check4Prime_checkArgs_2_inputs(num)) {
        }
        else 
        {
            // If undefined throw new Error();
            test_Check4Prime_checkArgs_undefined_input(num)
            
            // If zero/empty throw new Error();
            test_Check4Prime_checkArgs_zero_input(num)
       
            // Is not integer? throw new Error();
                        // If not a number throw new Error();
            test_Check4Prime_checkArgs_non_integer_input(num)
         
            // Get integer from character
            test_Check4Prime_checkArgs_char_input(num)

            // If less than lower bounds throw new Error();
            test_Check4Prime_checkArgs_neg_input(num)
 
            // If greater than upper bounds throw new Error();
            test_Check4Prime_checkArgs_above_upper_bound(num)

            // If in known true primes
            test_Check4Prime_known_true(num)

            // If in known false primes
            test_Check4Prime_known_false(num)
        }
    }
} // end Check4Prime class



/*
do the automated tests cases when developer performs test
*/
function checkTest(num)
{
    check4prime = new Check4Prime();
    // run various automated tests
    test_Check4Prime_known_true();
    test_Check4Prime_known_false();
    test_Check4Prime_checkArgs_neg_input();
    test_Check4Prime_checkArgs_above_upper_bound();
    test_Check4Prime_checkArgs_char_input();
    test_Check4Prime_checkArgs_2_inputs();
    test_Check4Prime_checkArgs_zero_input();
    test_Check4Prime_checkArgs_undefined_input();
    test_Check4Prime_checkArgs_non_integer_input();
}

/*
do the check for prime when ordinary user is running solution, you can merge this function with checkTest() if you want
*/
function check(num)
{
    check4prime = new Check4Prime();
    try {
        // Clear results
        document.getElementById('output').innerHTML = '';
        //check4prime.checkArgs(parseInt(num));
        // either use this assertion or the alert box for output
        //let description = `Input/number: ${num}.`;
        check4prime.checkArgs(num);
        //assert(check4prime.primeCheck(num), description)
        //alert(`Is number ${num} a prime? ${check4prime.primeCheck(num)}`)
    }
    catch (err) {
        //let description = `Input/number: ${num}. Error in checkArgs().. ${err}`;
        //check4prime.checkArgs(num);
        //assert(check4prime.primeCheck(num), description);
        console.log(err)
   }
}


/*
append test result in list on web page 
*/
function assert(outcome, description) {
    let output = document.querySelector('#output'); 
    let li = document.createElement('li'); 
    li.className = outcome ? 'pass' : 'fail'; 
    li.appendChild(document.createTextNode(description)); 
    output.appendChild(li); 
}

/*
Test methods, recommended naming convention
(Test)_MethodToTest_ScenarioWeTest_ExpectedBehaviour
In test method the pattern we use is "tripple A"
Arrange, Act and Assert
*/


// Test case 1, check known true primes
function test_Check4Prime_known_true(num) {
    // The arrangement below is called tripple A
	// Arrange - here we initialize our objects
	let primes = JSON.parse(localStorage.getItem("primes"));
    // Act - here we act on the objects
    if (!num) { num = "3"; }
    var lookarray = primes.indexOf(parseInt(num));
    look = false;
    if (lookarray > -1) { look = true; }
    // Assert - here we verify the result
    assert(look,`Test for known true primes: ` + num)
}

// Test case 2, check known false primes
function test_Check4Prime_known_false(num) {
    if (!num) { num = "4"; }
    let primes = JSON.parse(localStorage.getItem("primes"));
    var lookarray = primes.indexOf(parseInt(num));
    look = true;
    if (lookarray > -1) { look = false; }
    assert(look,`Test for known false primes: ` + num)
}

// Test case 3, check negative input
function test_Check4Prime_checkArgs_neg_input(num) {
    if (!num) { num = "10"; }
    if (num < min) {
        assert(false,'Test for lower bound limit: ' + num + ' is less then ' + min)
        //throw new RangeError("Input out of range, must be integer between " + min + " and " + max)
    } else { 
    assert(true,'Test for lower bound limit:' + num + ' is greater then ' + min)
    }
}

// Test case 4, check for upper bound limit
function test_Check4Prime_checkArgs_above_upper_bound(num) {
    if (!num) { num = "10"; }
    if (num > max) {
        assert(false,'Test for upper bound limit:' + num + ' is greater then ' + max)
        //throw new RangeError("Input out of range, must be integer between " + min + " and " + max)
    } else {
    assert(true,'Test for upper bound limit:' + num + ' is less then ' + max)
    }
}

// Test case 5, check for char input
function test_Check4Prime_checkArgs_char_input(num) {
    if (!num) { num = "A"; }
    if(!/^\d+$/.test(num)) {
        assert(true,'Test for char input: ' + num + ' is a char')
    } else {
        assert(false,'Test for char input: ' + num + ' is not a char')
        //throw new TypeError("Input is not character")
    }
}

// Test case 6, check for more than one input
function test_Check4Prime_checkArgs_2_inputs(num) {
    if (!num) { num = "3"; }
    if (/\s/.test(num)) {
        assert(false,'Test for more than one input: ' + num + ' is more than one input')
        //throw new Error("Enter one argument")
    } else {
    assert(true,'Test for more than one input: ' + num + ' is one input')
    }
}

// Test case 7, check for zero/empty input
function test_Check4Prime_checkArgs_zero_input(num) {
    if (!num) { num = "1"; }
    if (num) {
        assert(true,'Test for zero/empty input: ' + num + ' is not null or empty')
    } else {
        assert(false,'Test for zero/empty input: Empty or null input given')
        //throw new ReferenceError("No argument given as input")
    }
}

// Test case 8, check for undefined input
function test_Check4Prime_checkArgs_undefined_input(num) {
    if (!num) { num = "3"; }
    if (num) {
        assert(true,'Test for undefined input: ' + num + ' is a defined input')
    } else {
        assert(false,'Test for undefined input: undefined input given')
        //throw new ReferenceError("No argument given as input")
    }
}

// Test case 9, check for non-integer input
function test_Check4Prime_checkArgs_non_integer_input(num) {
    if (!num) { num = "3"; }
    if(!/^\d+$/.test(num)) {
        assert(false,'Test for non-integer input: ' + num + ' is non-integer')
        //throw new TypeError("Input must be a integer")
    } else {
    assert(true,'Test for non-integer input: ' + num + ' is integer')
    }
}