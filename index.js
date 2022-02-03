
// This website provides users with practice on basic math arithmetic (addition, subtraction, multiplication and division)

// level system changes in diviculty, length of practice and operations
var levels = [[11,1,5],[11,-1,5],[11,-1,10],[51,-1,5],[11, 2, 10], [11,-2,10]];

// stores level difficulty paramenters
// (boundary of the numbers, operation, total no of questions)

var operations = new Map();
operations.set(1,["Addition","Add:"]);
operations.set(-1,["Addition and Subtraction", "Add or Subtract:"]);
operations.set(2, ["Multiplication", "Multiply:"]);
operations.set(-2, ["Multiplcation and Division", "Multiply or Divide:"]);

// operation : 
// 1= addition
// -1 = addition and subtraction
// 2 = multiplication
// -2 = multiplication and division

var mathTotal = 5;
var mathLevel = 1;
var mathBound = 11;
var mathScore = 0;
var totalCorrect = 0; // counts the number of correct answers
var progCount = 0; // counts the progress
var mathAnswer = 2;

//header
const level_span = document.getElementById("level");
const topic_div = document.getElementById("topic");
const mathScore_span = document.getElementById("math-score");
const totalScore_span = document.getElementById("total-scoring");

var audioFail = new Audio('YameteK.mp3');
var audioSucceed = new Audio('wow.mp3');
var audioLvlup = new Audio('lvlup.mp3')

// math-problem
const mathProblem_div = document.getElementById("math-problem");
const mathExpression_span = document.getElementById("math-expression");
// total number of questions increases if the user makes mistakes in the first 5 question
// if the user gets 5 questions wrong in a row, they get demoted to the previous level

function setLevel(lvl){

    if (lvl == "restart") {
        lvl = 1}

    else if (lvl == "demote"){
        if (mathLevel > 1){ 
            lvl = mathLevel -1;}
        
        else {lvl = mathLevel;}
        }

    level_span.innerHTML = lvl;

    if (lvl < 7){
        var topicOperation = operations.get(levels[lvl-1][1]);
        topic_div.innerHTML = topicOperation[0];
        mathProblem_div.innerHTML =topicOperation[1];
        mathBound = levels[lvl-1][0];
        mathTotal = levels[lvl-1][2];
        totalScore_span.innerHTML = mathTotal;}

    else{
        topic_div.innerHTML= "Multiplication and Division";
        mathProblem_div.innerHTML= "Multiply and Divide:";
        mathTotal = 5;
        totalScore_span.innerHTML= 5;
        mathBound = 11;}
    
    mathLevel = lvl;
    mathScore = 0;
    mathScore_span.innerHTML = 0;
}

function createQuestion(lvl){

    const num1= Math.floor(Math.random() * mathBound) ;
    const num2= Math.floor(Math.random() * mathBound) ;

    if (lvl > 5) {

        if( Math.floor(Math.random()*4) < 2){
            // divide
            mathAnswer = num2;
            mathExpression_span.innerHTML=String(num1*num2) + " ÷ " + String(num1) + " = ";
        }
 
        else {

            mathAnswer = num1 * num2;
            mathExpression_span.innerHTML=String(num1) + " × " +String(num2) + " = ";
        }
    }
    else if (lvl > 1 && lvl < 5){

        if( Math.floor(Math.random()*4) < 2){
            // subtract
            mathAnswer = num2;
            mathExpression_span.innerHTML=String(num1+num2) + " - " + String(num1) + " = ";
        }
 
        else {

            mathAnswer = num1 + num2;
            mathExpression_span.innerHTML=String(num1) + " + " +String(num2) + " = ";
        }

    }

    
    else if (lvl == 5){

        mathAnswer = num1 * num2;
        mathExpression_span.innerHTML=String(num1) + " × " +String(num2) + " = ";

    }

    else if (lvl ==1){

        mathAnswer = num1 + num2;
        mathExpression_span.innerHTML=String(num1) + " + " +String(num2) + " = ";

    }
}

function submitAnswer(){

    var ans = document.getElementById("answer").value;

    if (ans == mathAnswer){

        mathScore += 1;
        totalCorrect +=1;
        progCount +=1;

        if (mathScore == mathTotal){

            setLevel(mathLevel + 1);
            audioLvlup.play();
            progCount = 0;}

        else {
            audioSucceed.currentTime = 0;
            audioSucceed.play();
            mathScore_span.innerHTML = mathScore;}
        }


    
    else {

        audioFail.currentTime = 0;
        audioFail.play();
        progCount +=1;

        if (progCount < 5){
            mathTotal += 2;
            totalScore_span.innerHTML=mathTotal;}
        
        else if(mathScore == 0){

            setLevel("demote");
            progCount = 0;

        }
    }

    createQuestion(mathLevel)
}
