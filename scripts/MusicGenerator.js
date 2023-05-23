


class MusicGenerator extends Music{
 
    // Music Generator
    constructor(key, scale, time){ // main key and scale ------- time is in s
        
        super(key, scale);
        this.rythm = new Rhythm();
        this.SongLength = Math.ceil(time/this.rythm.BarTime);  // No. Bars in Song

        this.MusicChordProg = []; // array of chords
        const prog = createProgression(key, scale);
        
        for (const chords of prog){

            this.MusicChordProg.push(new Chord(key + this.MusicScale[chords[0]], chords[1], this.rythm.beats(1)));

        }

        this.MusicChordPointer = [0, this.MusicChordProg[0]]; // tracking chord progression
        
        this.MusicBeatPointer =0; // track beat of the melody
        this.BeatTime =0; // increment of beats
    }

    generateNotes(){ // creating bars to generate

        this.Musicbeat = this.rythm.beats(5);

    }

    /*findNote(direction){ // find note after changing chords

        for (let i =0; i < 13; i++) {

            this.CurrentNote += direction;

        }

        this.intervalTracker = this.MusicScale.indexOf( (this.CurrentNote - this.key) % 13);
        this.appoggiatura = 0;
        this.appoggiatureStore = 0;

    }*/

    playChords(){

        
        var output = this.MusicChordProg[this.MusicChordPointer[0]].playChord();

        if (output ==[]){

            this.MusicChordPointer[0] = (this.MusicBeatPointer[0] +1) % this.MusicChordProg.length;
            this.playChords();
        }

        return output;
    }
    
    playNote(){


        if (this.CurrentNote>50){ // bounding the range

            var direction = -1;}
            if (this.appoggiatura ==3){ this.appoggiatura= 0;}
        
        else if (this.CurrentNote<20){

            var direction = 1;}
            if (this.appoggiatura ==3){ this.appoggiatura= 0;}
        
        else{
            var direction = Math.pow(-1, Math.floor(Math.random()*3));} // decrement by (-1) ** direction

        switch (this.appoggiatura){

            case 1 || 2: 

                this.CurrentNote += direction * this.appoggiatureStore[this.appoggiatureStore.length-1];
                this.appoggiatureStore.pop();
                if (this.appoggiatureStore.length == 0){

                    this.appoggiatura = 0;}
                
                break;

            
            case 3:

                this.appoggiatureStore[1] -=1;
                if (this.appoggiatureStore[1]== this.appoggiatureStore[2]){
                    this.appoggiatureStore[0]*= (-1);
                }

                this.nextnote(this.appoggiatureStore[0]);

                if (this.appoggiatureStore[1]==0){

                    this.appoggiatura = 0;}
                
                break;
            
          /*  case 4:
                
                if (this.appoggiatureStore[0]== this.MusicChordPointer[0]){ 
                    this.appoggiatureStore[1].nextnote(direction);
                    this.CurrentNote = this.appoggiatureStore[1].CurrentNote;}

                else{

                    this.findNote(direction);
                    this.nextnote(direction);}
                
                break;*/
            
            default:

                this.appoggiatura = Math.floor(Math.random()*31); 
                //console.log(this.appoggiatura);
                switch(this.appoggiatura){

                    case 1: // Appogiatura
                        
                        this.appoggiatureStore = [];
                        this.appoggiature(direction);
                        this.CurrentNote += direction * this.appoggiatureStore[this.appoggiatureStore.length-1];
                        this.appoggiatureStore.pop();

                        break;
            
                    case 2: // Turns

                        this.appoggiatureStore = [];
                        this.turn(direction);
                        this.CurrentNote += direction * this.appoggiatureStore[this.appoggiatureStore.length-1];
                        this.appoggiatureStore.pop();

                        break;
               
                    case 3: // Running Scale

                        this.consecturn(direction);
                        this.nextnote(direction);

                        break;
                        
                  /*  case 4: // Key Change

                        var change = Math.floor(Math.random()*3) + 8;
                        this.keychange(this.MusicChordPointer[1].key, scales[change], this.MusicChordPointer[0]);
                        this.CurrentNote = this.appoggiatureStore[1].CurrentNote;

                        break;*/
                        
                    default:

                        var flunctuate = Math.floor(Math.random()*6);

                        if (flunctuate <2){
                            var interval = 7;}
                        else {
                            var interval = 4;}
                        
                        this.appoggiatureStore = Math.floor(Math.random()*interval);

                        if (this.appoggiatureStore==0){

                            break;
                        }
            
                        for(let i =0; i < this.appoggiatureStore; i ++){
                            
                            this.nextnote(direction);}
                    }
                }
        
        if(isNaN(this.CurrentNote)) {

            this.CurrentNote = this.Musickey;
            this.intervalTracker=0;
        }

        let output =[this.CurrentNote,this.Musicbeat[this.Musicbeat.length-1]];
        this.Musicbeat.pop();
        
        
        if (this.Musicbeat.length == 0){

            this.generateNotes(); // new bar
            this.MusicChordPointer = (this.MusicChordPointer[0] + 1)% this.MusicChordProg.length;
            this.MusicChordPointer = [this.MusicChordPointer, this.MusicChordProg[this.MusicChordPointer]]; // change chord
            //this.findNote(direction); // adjust note
            this.SongLength -= 1;
        }

        return output;
                    
    } 
}
//<script src='https://cdnjs.cloudflare.com/ajax/libs/tone/13.3.21/Tone.js'> </script>
//<script src='https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.2/ace.js'></script>


