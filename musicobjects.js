
// Music Guide & Embelishments
// music object used to guide the music 

class Music{

    constructor(key, scale){ // main key and scale ------- time is in s

        this.key = key;
        this.Musickey = key + ( 13 * (Math.floor(Math.random()*2)+1)) ; //(mod13)
        this.MusicScale = scales[scale][1]; // list of notes (mod key mod 13)
        this.MusicScaleIterate = scales[scale][2];

        this.CurrentNote = this.Musickey;
        this.intervalTracker=0;

        // embelishments
        this.appoggiatura = 0; // 0-None, 1-Appogiatura 2- Turns, 3-Scale, 4- keychange
        this.appoggiatureStore = 0; // number of appeggiature / notes needed to play 1== last note

    }

    /*keychange(key, scale, chrd){ // chrd is the Chord Pointer

        this.appoggiatureStore = [chrd, new Music(key,scale)];}*/

    appoggiature(direction){ // creates appoggiature storage of intervals


        if (direction==-1){

            this.appoggiatureStore.push(1, -1);}

        else {
            
            let turnVal = this.MusicScaleIterate[(this.intervalTracker + 1) % this.MusicScale.length];
            this.appoggiatureStore.push((-1) * turnVal, turnVal);}}

    turn(direction){
        this.appoggiature(direction);
        this.appoggiature((-1) * direction);}
    
    nextnote(direction){ // increments by 1 or -1 each time

        this.intervalTracker = (this.intervalTracker + direction) % this.MusicScaleIterate.length;
        this.CurrentNote += (direction * this.MusicScaleIterate[this.intervalTracker]);
    
        if (this.CurrentNote< 0 || this.CurrentNote> 64){

            this.CurrentNote -=(direction * this.MusicScaleIterate[this.intervalTracker]);
            this.intervalTracker = (this.intervalTracker - direction) % this.MusicScaleIterate.length
        }
    }

    consecturn(direction){ // up and down scale     |    note = [note, turning point]

        this.appoggiatureStore =[direction, Math.floor(Math.random()*28) +1, Math.floor(Math.random()*15)];}
}


// Chords 
class Chord{

    constructor(key, chrd, beats){

        this.key = key;
        this.octaveKey =key + (13 * Math.floor(Math.random()*3));
        this.chord = chord.get(chrd);
        var octaveChord = [];
        var octaveKey = this.octaveKey;

        function addchords(value){
                octaveChord.push(octaveKey+value);
        }
        var c = this.chord;

        try {
            c.forEach(addchords);}
        
        catch(err){

            var c = [0,4,8,16,20];
            c.forEach(addchords);

        }

        this.octaveChord = octaveChord;
        
        this.arpegpattern = beats;
        this.pointer=0

    }

    playChord(){

        if (this.pointer == this.arpegpattern.length){

            this.pointer = 0;
            return [];

        }
        var roll = Math.floor(Math.random()*2);

        if (roll != 0){ // arpegio

            var arpegNum = Math.floor(Math.random()* this.chord.length);
            var play = [this.octaveChord[arpegNum], this.arpegpattern[this.pointer]];
            this.pointer += 1;
            return play;

        }

        else{

            var play = [this.octaveChord , this.arpegpattern[this.pointer]];
            this.pointer += 1;
            return play;

        }



    }

}

