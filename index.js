
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
var streak = 0;
var totalScore = 0; // counts the number of correct answers
var progCount = 0; // counts the progress
var mathAnswer = 2;

//header
const sBoard = document.getElementById("scoreboard");
const level_span = document.getElementById("level");
const topic_div = document.getElementById("topic");
const mathScore_span = document.getElementById("math-score");
const totalScore_span = document.getElementById("total-scoring");

var audioFail = new Audio('fail.mp3');
var audioSucceed = new Audio('wow.mp3');
var audioLvlup = new Audio('lvlup.mp3');
var audioLvldown = new Audio('lvldown.mp3');

// math-problem
const mathProblem_div = document.getElementById("math-problem");
const mathExpression_span = document.getElementById("math-expression");
// total number of questions increases if the user makes mistakes in the first 5 question
// if the user gets 5 questions wrong in a row, they get demoted to the previous level

function setLevel(lvl){

    if (lvl == "restart") {
        lvl = 1;
        totalScore = 0;
        streak = 0;
        }

    else if (lvl == "demote"){
        if (mathLevel > 1){ 
            lvl = mathLevel -1;
            totalScore = Math.max(totalScore -5, 0);
            sBoard.innerHTML = String(totalScore).padStart(7,'0');}
        
        else {lvl = mathLevel;}
        }
    
    else if (lvl =="skip"){
        lvl +=1;}

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
        mathTotal = 5 + lvl;
        totalScore_span.innerHTML= 5 + lvl;
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

function Score(){

    if (progCount > 1){

        totalScore += streak + 1;

    }

    else{

        totalScore +=1;
        streak = 0;

    }

    streak+=1;
    sBoard.innerHTML= String(totalScore).padStart(7,'0');

}

function submitAnswer(){

    var ans = document.getElementById("answer").value;

    if (ans == mathAnswer){

        mathScore += 1;
        progCount +=1;

        Score();

        if (mathScore == mathTotal){

            setLevel(mathLevel + 1);
            audioFail.pause();
            audioLvlup.play();
            progCount = 0;}

        else {
            audioFail.pause();
            audioSucceed.currentTime = 0;
            audioSucceed.play();
            mathScore_span.innerHTML = mathScore;}
        
        
    }


    
    else {

        progCount +=1;
        streak = 0; // break streak

        if (progCount < 5){
            mathTotal += 2;
            totalScore_span.innerHTML=mathTotal;
            audioSucceed.pause();
            audioFail.currentTime = 0;
            audioFail.play();}
        
        else if(mathScore == 0){
            audioFail.pause();
            setLevel("demote");
            audioLvldown.play();
            progCount = 0;
            sBoard.style.animation = 'none';
            sBoard.offsetHeight;
            sBoard.style.animation=null;
            sBoard.style.animation= "blink 0.2s linear 4";

        }
        else{
            audioSucceed.pause();
            audioFail.currentTime = 0;
            audioFail.play();
        }
    }

    createQuestion(mathLevel);
    document.getElementById("answer").value = "";
}


function keyDown(){

    if (event.keyCode ==13){
        submitAnswer();
    }
}

function skipLvl(){

    setLevel(mathLevel +1);
    createQuestion(mathLevel);
}

function restart(){

    setLevel(1);
    createQuestion(1);

}