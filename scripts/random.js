

// functions that manipulate arrays

function sum(Array){

    var summed =0;

    for (let i=0; i<Array.length; i++){

        summed += Array[i];
    }

    return summed;
}

function shuffle(Array){

    var shuffled = [];
    var tempArray = Array;

    while (tempArray.length !=0){

        const index = Math.floor(Math.random()* (tempArray.length));
        shuffled.push(tempArray[index]);
        tempArray[index]= tempArray[tempArray.length-1];
        tempArray.pop();

    }

    return shuffled;

}