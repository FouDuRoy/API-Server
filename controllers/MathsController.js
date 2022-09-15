const path = require('path');
const fs = require('fs');

//Functions used for the get method

//Check the number of arguments
function CheckNbrOfArgs(operation,length)
{
    if((operation == '!' || operation == 'p' || operation == 'np'))
    {
        if(length > 2)
        return true;
    }
    else
    {
        if(length > 3)
        return true;
    }
    return false;
}
//Adds up numbers got in arguments x and y
function somme(x,y) {
    return (parseInt(x) + parseInt(y));
}
//Substracts numbers got in arguments x and y
function substract(x,y) {
    return (parseInt(x) - parseInt(y));
}
//Multiplies numbers got in arguments x and y
function multiply(x,y) {
    return (parseInt(x) * parseInt(y));
}
//Divides numbers got in arguments x and y
function divide(x,y) {
    return (parseInt(x) / parseInt(y));
}
//Gives back the modulo value got in arguments x and y
function modulo(x,y) {
    return (parseInt(x) % parseInt(y));
}
//Gets factorial value of argument n
function factorielle(n) {
    return n == 0? 1 : n * factorielle(n-1);
}
//Returns if argument n is prime number or not
function IsPrime(n)
{
    for (let i = 2; i < parseInt(n); i++) {
        if (parseInt(n) % i == 0) {
            return false;
        }
    }
    return true;
}
//finds place of prime number of argument n
function findPrime(n){
    let primeNumer = 0;
    for ( let i=0; i < n; i++){
        primeNumer++;
        while (!isPrime(primeNumer)){
            primeNumer++;
        }
    }
    return primeNumer;
}


module.exports =
    class MathsController extends require('./Controller') {
        constructor(HttpContext) {
            super(HttpContext);
            this.params = HttpContext.path.params;
        }
        get() {
            if(this.HttpContext.path.queryString == '?')
            {
                let helpPagePath = path.join(process.cwd(), "wwwroot/helpPages/mathsServiceHelp.html");
                let content = fs.readFileSync(helpPagePath);
                this.HttpContext.response.content("text/html", content);
            }
            else {
                if (CheckNbrOfArgs(this.HttpContext.path.params.op,Object.keys(this.HttpContext.path.params).length))
                {
                    this.HttpContext.path.params.error = "too many parameters";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
                if(this.HttpContext.path.params.op)
                {
                    let op = this.HttpContext.path.params.op;
                    switch (op){
                        case ' ' : 
                        this.HttpContext.path.params.op = '+';
                           
                            if(this.HttpContext.path.params.x == undefined || this.HttpContext.path.params.y == undefined)
                            {
                                this.HttpContext.path.params.error = 'missing variable, only x and y authorised';
                            }
                            this.HttpContext.path.params.value = somme(this.HttpContext.path.params.x,this.HttpContext.path.params.y);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case '-':
                            this.HttpContext.path.params.value = substract(this.HttpContext.path.params.x,this.HttpContext.path.params.y);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case '*':
                            this.HttpContext.path.params.value = multiply(this.HttpContext.path.params.x,this.HttpContext.path.params.y);
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case '/':
                            if(parseInt(this.HttpContext.path.params.x) != 0 && parseInt(this.HttpContext.path.params.y) != 0)
                            {
                                this.HttpContext.path.params.value = divide(this.HttpContext.path.params.x,this.HttpContext.path.params.y);
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                this.HttpContext.path.params.value = null;
                                this.HttpContext.path.params.error = "Can't take 0's sorry";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        case '%':
                            if(parseInt(this.HttpContext.path.params.x) != 0 && parseInt(this.HttpContext.path.params.y) != 0)
                            {
                                this.HttpContext.path.params.value = modulo(this.HttpContext.path.params.x,this.HttpContext.path.params.y);
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                this.HttpContext.path.params.value = null;
                                this.HttpContext.path.params.error = "Can't take 0's sorry";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        case '!':
                            if(parseInt(this.HttpContext.path.params.n) != 0)
                            {
                                this.HttpContext.path.params.value = factorielle(parseInt(this.HttpContext.path.params.n));
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                this.HttpContext.path.params.value = null;
                                this.HttpContext.path.params.error = "Can't take 0's sorry";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                        case 'p':
                            let isPrime = IsPrime(this.HttpContext.path.params.n);
                            this.HttpContext.path.params.value = isPrime;
                            this.HttpContext.response.JSON(this.HttpContext.path.params);
                            break;
                        case 'np':
                            if(parseInt(this.HttpContext.path.params.n) != 0)
                            {
                                this.HttpContext.path.params.value = findPrime(parseInt(this.HttpContext.path.params.n));
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            else
                            {
                                this.HttpContext.path.params.value = null;
                                this.HttpContext.path.params.error = "Can't take 0's sorry";
                                this.HttpContext.response.JSON(this.HttpContext.path.params);
                            }
                            break;
                            default:
                            this.HttpContext.path.params.error = 'operation is missing' ;
                    }
                }
                else
                {
                    this.HttpContext.path.params.error = "Missing parameter op";
                    this.HttpContext.response.JSON(this.HttpContext.path.params);
                }
            }
        }
    }
    
