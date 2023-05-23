// rhythm and beats

/*var randomValueBound = [250, 175, 150, 125, 100, 50, 35, 20, 15, 10, 5];
var randomWeights = [1,1,2,2,4,5,8,10,16,21,32]; // weighted for true random

*/

function bpb(){

    var rng = Math.floor(Math.random() * 9);
    if (rng <2){

        return 4;}

    else{ 
        
        return rng;}
    
}


class Rhythm{

    constructor(){

        this.bpb = bpb();
        this.BarTime = Tone.TimeBase('4n').valueOf() * this.bpb; // seconds per bar


        /*
        
        this.value = [];
        this.restraint=[];

        for (let i=0; i<11; i++){

            this.value += [Math.floor(Math.random() * randomValueBound[i]) +1];
            this.restraint +=[Math.floor(Math.random() * randomWeights[i]) +1]; 

        */

        }
    
    beats(bars){

        var notes_distributed =[];
        var solution= notesKnapsack((this.bpb *16) * bars);
        var pointer=0;          
            
        function distribute(value){
            
                if (value > 0){

                    for (let i = 0; i < value; i++){
                        notes_distributed.push(noteDurationHash[noteDuration[pointer]]);
                    }}

                pointer +=1;
                }

        solution.forEach(distribute);

        notes_distributed =  shuffle(notes_distributed);

        return notes_distributed;
                    
            
        
    }
}


