/*Xiaoying Li*/
/*CS290 HW Assignment 3: Higher-Order Functions and Objects*/


function Automobile (year, make, model, type) {
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
}


/*This function is added to the Automobile class and accept a single boolean argument.*/
Automobile.prototype.logMe = function (bool) {
    //If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile.
    if (bool == true) {
        console.log (this.year+" "+this.make+" "+this.model+" "+this.type);
	}

    //If the argument is 'false' then the type is ommited and just the "year make model" is logged.
    else {
        console.log (this.year+" "+this.make+" "+this.model);
	}
}


var automobiles = [ 
    new Automobile (1995, "Honda", "Accord", "Sedan"),
    new Automobile (1990, "Ford", "F-150", "Pickup"),
    new Automobile (2000, "GMC", "Tahoe", "SUV"),
    new Automobile (2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile (2005, "Lotus", "Elise", "Roadster"),
    new Automobile (2008, "Subaru", "Outback", "Wagon")
    ];


/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
function sortArr (comparator, array) {
    /*your code here*/
    var newArr = array.slice(0);
    for (var i=0; i<newArr.length-1; i++) {
        for (var j=i+1; j<newArr.length; j++) {
            if (comparator(newArr[j], newArr[i])) {
                var temp = newArr[i];
                newArr[i] = newArr[j];
                newArr[j] = temp;
			}  
		}
	}
    return newArr;
}


/*A comparator takes two arguments and uses some algorithm to compare them. If the first argument is larger or greater than the 2nd it returns true, otherwise it returns false. Here is an example that works on integers*/
function exComparator (int1, int2) {
    if (int1 > int2) {
        return true;
    } else {
        return false;
    }
}


/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator (auto1, auto2) {
    /* your code here*/
    if (auto1.year > auto2.year) {
        return true;
	}
    else {
        return false;
	}
}


/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier in the alphabet are "greater" than ones that come later.*/
function makeComparator (auto1, auto2) {
    /* your code here*/
    if (auto1.make.toLowerCase() < auto2.make.toLowerCase()) {
        return true;
	}
    else {
        return false;
	}
}


/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model year should be considered "greater".*/
function typeComparator (auto1, auto2) {
    /* your code here*/
    var typeOrder = function (auto) {
        switch (auto.type.toLowerCase()) {
            case "roadster":
                return 5;
                break;
            case "pickup":
                return 4;
                break;
            case "suv":
                return 3;
                break;
            case "wagon":
                return 2;
                break;
            default:
                return 1;
		}
	}
    if (typeOrder(auto1) > typeOrder(auto2)) {
        return true;
	}
    else if (typeOrder(auto1) == typeOrder(auto2)) {
        return yearComparator(auto1, auto2);
	}
    else {
        return false;
	}
}


/*This function calls the logMe function for every Automobile object in an array.*/
function outputCar (autoArr, bool) {
    autoArr.forEach(function(x) {
        x.logMe(bool);
	})
}


/*Using the sortArr function to sort Automobiles by year/make/type.*/
var yearSorted = sortArr(yearComparator, automobiles);
var makeSorted = sortArr(makeComparator, automobiles);
var typeSorted = sortArr(typeComparator, automobiles);

console.log("*****");
console.log("The cars sorted by year are:");
outputCar(yearSorted, false);

console.log("\nThe cars sorted by make are:");
outputCar(makeSorted, false);

console.log("\nThe cars sorted by type are:");
outputCar(typeSorted, true);
console.log("*****");


/*Your program should output the following to the console.log, including the opening and closing 5 stars. All values in parenthesis should be replaced with appropriate values. Each line is a seperate call to console.log.

Each line representing a car should be produced via a logMe function. This function should be added to the Automobile class and accept a single boolean argument. If the argument is 'true' then it prints "year make model type" with the year, make, model and type being the values appropriate for the automobile. If the argument is 'false' then the type is ommited and just the "year make model" is logged.

*****
The cars sorted by year are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by make are:
(year make model of the 'greatest' car)
(...)
(year make model of the 'least' car)

The cars sorted by type are:
(year make model type of the 'greatest' car)
(...)
(year make model type of the 'least' car)
*****

As an example of the content in the parenthesis:
1990 Ford F-150 */