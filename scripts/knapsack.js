
// knapsack function with bounds:


function knapsack(size, values, weights, quantity, bounds){

    // initializing data tables to store intermediate values
    var hashValue = [];
    var matrixObject = [];
    var tempcol1 = [];
    var tempcol2 = [];
    var tempvalue; // placeholder number value for the function
    var tempstorage = [];
    var tempstorageval;
    var objectsTaken = [];
    var maxx;

    for (let l=0; l < bounds+1; l++){
        //initialize the first column
        tempvalue = Math.min(Math.floor(l/weights[0]), quantity[0]);
        tempcol1.push(tempvalue*values[0]);
        tempcol2.push(tempvalue);
    }

    hashValue.push(tempcol1);
    matrixObject.push(tempcol2);

    /*
    for (let l=0; l < bounds+1; l++){
        console.log(hashValue[0][l]);
    }
    */

    // create matrix
    for (let x=1 ; x <size ; x++){
        tempcol1 = [];
        tempcol2 = [];
        for (let lambda=0; lambda <bounds+1; lambda++){
            tempvalue = Math.min(Math.floor(lambda/weights[x]), quantity[x]);
            tempstorage = [];

            if (tempvalue==0){
                tempcol1.push(hashValue[x-1][lambda]);
                tempcol2.push(0);
                // console.log(x,lambda);
                // console.log(tempcol1[lambda]);
            }
            
            else{
                
                for (let i=0; i< tempvalue +1; i++){
                    // console.log(x,lambda,i,lambda-(i*weights[x]),hashValue[x-1][lambda-(i*weights[x])]);
                    tempstorage.push(hashValue[x-1][lambda-(i*weights[x])]+i*values[x]);
                }

                maxx = Math.max.apply(null, tempstorage);
                tempstorageval = tempstorage.indexOf(maxx);
                // console.log(x,lambda,tempstorage,tempstorageval,maxx);
                tempcol1.push(maxx);
                // console.log(tempcol1[lambda]);
                tempcol2.push(tempstorageval);
            } 
        }

        hashValue.push(tempcol1);
        matrixObject.push(tempcol2);

        /*
        for (let l=0; l < bounds+1; l++){
            console.log(hashValue[x][l]);
        }
        */
    }

    var objectSize = size-1;
    var objectBound = bounds;

    while (objectSize>=0){
        objectsTaken.unshift(matrixObject[objectSize][objectBound]);
        // console.log(objectsTaken);
        objectBound -= (objectsTaken[0]*weights[objectSize]);
        objectSize -= 1;
    }

    return (objectsTaken);
}
