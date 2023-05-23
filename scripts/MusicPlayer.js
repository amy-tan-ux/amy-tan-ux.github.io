 
function play(MusGen){

    MusGen.generateNotes();
    var iter = Math.max(MusGen.Musicbeat.length, MusGen.MusicChordProg[MusGen.MusicChordPointer[0]].arpegpattern.length);
    var t = 0;
    var chordt =0;
    var now = Tone.now();

    for(let i=0; i <iter; i++){

        var temp = MusGen.playNote();
        var tempChord = MusGen.playChords();

       // console.log(t);
       // console.log(temp);
        if (! isNaN(temp[0])) {

            polySynth.triggerAttackRelease(notes[temp[0]], temp[1], now+ t);

        }

        if (! isNaN(tempChord[0])){

            var newtempChord = []
            for (let i=0; i < tempChord[0].length ; i ++){
                newtempChord.push(notes[tempChord[0][i]]);
            }
            polySynth.triggerAttackRelease(newtempChord, tempChord[1], now+ chordt);

            //console.log(newtempChord);
        }
        t += Tone.TimeBase(temp[1]).valueOf();
        chordt += Tone.TimeBase(tempChord[1]).valueOf();


    }

}



function go(){

    var MusGen =  new MusicGenerator(0,1,600);

   // for (let i =0; i<20;i++){

    //    setTimeout(play,MusGen.rythm.BarTime * i, MusGen);}

    play(MusGen);

    //console.log(MusGen.playChords());

    /*MusGen.generateNotes();
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());
    console.log(MusGen.playNote());*/

    //console.log(MusGen.CurrentNote);
    //console.log(MusGen.beats(1));
    //MusGen.generateNotes();
    //console.log(MusGen.CurrentNote);

    //while (MusGen.SongLength != 0){
    //MusGen.generateNotes();
            
    
    //console.log(MusGen.nextnote());
    //console.log(MusGen.CurrentNote);}
    //var p = {1:4, 7:5}

    
}