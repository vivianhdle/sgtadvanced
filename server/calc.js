function do_math(num1,num2,op){
    switch(op) {
        case '+':
            return num1+num2;
            break;
        case '-':
            return num1-num2;
            break;
        case '*':
        case 'x':
        case 'X':
            return num1*num2
            break;
        case '/':
            return num1/num2;
            break;
        default:
            return 'Try again'
    }
}
var n1 = parseInt(process.argv[2]);
var op = process.argv[3];
var n2 = parseInt(process.argv[4]);
console.log(process.argv);

var answer = do_math(n1,op,n2);

console.log(answer);