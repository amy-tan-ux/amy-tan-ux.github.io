

// generate progressions
function createProgression(key, scale){

        var progressions = ["doowop", "majorprog", "jazz", "major_scale", "minor_scale", "secondarydom", "secondarydom"][ Math.floor(Math.random()*6)];
    
        if ( progressions == "major_scale" || progressions == "minor_scale"){
    
            var numChords = Math.floor(Math.random()*7);
            var chordProgression = [];
            var chordResolution = []; // Stores resolution chords
            var rollchord = Math.floor(Math.random()*7);

            for (let i=0; i < numChords; i++){
                
                if (interval[rollchord][0]==1 && ! chordResolution){

                    chordResolution+= [[rollchord, progression[progressions][rollchord]]];
                }
                
                if (i == numChords - 1){

                    if (chordResolution){

                        chordProgression += chordResolution;

                    }

                    else {

                        chordProgression +=[[0,"major"]];
                    }

                }

                else{
                    
                    chordProgression += [[rollchord, progression[progressions][rollchord]]];

                }

                rollchord = rollchord = Math.floor(Math.random()*7);

    
            }
    
        }

        else {

            chordProgression = progression[progressions];

        }

        return chordProgression;
    
}


// Knapsack Note Duration

function notesKnapsack(bars){

    try{
        
        var durationVal = [     Math.floor(Math.random() *380)+1,
            Math.floor(Math.random() *251)+1, 
            Math.floor(Math.random() *175)+1,
            Math.floor(Math.random() *150)+1,
            Math.floor(Math.random() *125)+1,
            Math.floor(Math.random() *100)+1,
            Math.floor(Math.random() *50)+1,
            Math.floor(Math.random() *35)+1,
            Math.floor(Math.random() *18)+1,
            Math.floor(Math.random() *15)+1,
            Math.floor(Math.random() *15)+1,
            Math.floor(Math.random() *13)+1];
        
        
        var durationMax = [     Math.floor(Math.random() *2),
                Math.floor(Math.random() *2), 
                Math.floor(Math.random() *2),
                Math.floor(Math.random() *3),
                Math.floor(Math.random() *3),
                Math.floor(Math.random() *10),
                Math.floor(Math.random() *20),
                Math.floor(Math.random() *20),
                Math.floor(Math.random() *2),
                Math.floor(Math.random() *4),
                Math.floor(Math.random() *3),
                Math.floor(Math.random() *3)];
        
            var classer = knapsack(12, durationVal, noteDuration, durationMax, bars);
            
            }
        
        catch(err){run();}

        return classer;
    }

