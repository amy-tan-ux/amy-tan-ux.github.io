
// music theory database
const notes = ['Ab1', 'A1', 'Bb1', 'B1', 'C2', 'Db2', 'D2', 'Eb2', 'E2', 'F2', 'Gb2', 'G2',
                'Ab2', 'A2', 'Bb2', 'B2', 'C3', 'Db3', 'D3', 'Eb3', 'E3', 'F3', 'Gb3', 'G3',
                'Ab3', 'A3', 'Bb3', 'B3', 'C4', 'Db4', 'D4', 'Eb4', 'E4', 'F4', 'Gb4', 'G4',
                'Ab4', 'A4', 'Bb4', 'B4', 'C5', 'Db5', 'D5', 'Eb5', 'E5', 'F5', 'Gb5', 'G5',
                'Ab5', 'A5', 'Bb5', 'B5', 'C6', 'Db6', 'D6', 'Eb6', 'E6', 'F6', 'Gb6', 'G6',
                'Ab6', 'A6', 'Bb6', 'B6'];

const noteRange = 64;


// [Mode, [ScaleNotes]]
var scales =  {
                1: ["major_scale", [0,2,4,5,7,9,11], [2,2,1,2,2,2,1]], // steps starting at the key/note
                2: ["dorian_scale", [0,2,3,5,7,9,10], [2,1,2,2,2,1,2]],
                3: ["phrygian_scale", [0,1,3,5,7,8,10], [1,2,2,2,1,2,2]],
                4: ["lydian_scale", [0,2,4,6,7,9,11], [2,2,2,1,2,2,1]],
                5: ["mixolydian_scale", [0,2,4,5,7,9,10], [2,2,1,2,2,1,2]],
                6: ["minor_scale", [0,2,3,5,7,8,10], [2,1,2,2,1,2,2]],
                7: ["locrian_scale",[0,1,3,5,6,8,9], [1,2,2,1,2,1,3]],
                8: ["harmonic_scale", [0,2,3,5,7,9,10], [2,1,2,1,3,1,2]],
                9: ["lydian_dom", [0,2,3,5,6,9,10], [2,2,2,1,2,1,2]],
                10: ["whole_tone", [0,2,4,7,9,13,15], [2]],
                11: ["whole_tone", [0,2,4,7,9,13,15], [2]]};


//( Interval: [Type, ['dominant', Semitone] ) Degree, resolutions
var interval = {
                0: [1,[0, 1, 3, 4, 2]], // 1 means resolved
                1: [0,[0, 2, 1,3]],
                2: [0,[0, 4, 2]],
                3: [0,[2, 4, 3]],
                4: [0,[0, 5, 4]],
                5: [1,[0, 3, 5]],
                6: [0,[0, 5, 6]]};

function chooseChord(Chords){

    let random = Math.floor(Math.random()* Chords.length);
    return chord.get(Chords[random]);

}

var chord = new Map();
chord.set("power", [0,7]); // +-
chord.set("sus2", [0,2,7]); // +=
chord.set("sus4", [0,5,7]); // +-
chord.set("maj7", [0,4,7,11]); // +
chord.set("min7", [0,3,7,10]); // -
chord.set("dom7", [0,4,7,10]); 
chord.set("add9", [0,4,7,14]);// +
chord.set("minadd9", [0,3,7,14]);// -
chord.set("add11", [0,4,7,17]); // +
chord.set("minadd11", [0,3,7,17]); // -
chord.set("maj6", [0,4,7,9]); // +
chord.set("min6", [0,3,7,9]); // -
chord.set("min9", [0,3,7,10,14]);// =
chord.set("dom9", [0,4,7,10,14]);
chord.set("maj11", [0,4,7,11,14,17]);// +
chord.set("min11", [0,3,7,10,14,17]); // -
chord.set("dom11", [0,4,7,10,14,17]);
chord.set("maj13", [0,4,7,11,14,17,21]); // +
chord.set("min13", [0,3,7,10,14,17,21]); // -
chord.set("dom13", [0,4,7,10,14,17,21]); 
chord.set("dim", [0,3,6]); 
chord.set("aug", [0,4,8]);
chord.set("b13", [0,3,6,10]);
chord.set("s9", [0,4,7,10,15]); //+
chord.set("b9", [0,4,7,10,13]); 
chord.set("halfdim", [0,4,7,10,14,17,20]);
chord.set("four", [0,5]);
chord.set("four_voice", [0,4,8,16,20]);
chord.set("five_voice", [0,5,10,15,20,25]);
chord.set("majchord", [0,4,7]);// +
chord.set("minchord", [0,3,7]);//-
chord.set("major", chooseChord(["majchord", "power", "sus2", "sus4", "maj7", "add9", "add11",
                                   "maj6", "maj11", "maj13", "s9" ])); // +
chord.set("minor", chooseChord(["minchord", "power", "sus2", "sus4", "min7", "minadd9", "minadd11", 
                                    "min6", "min9", "min11", "min13"])); // -
chord.set("passing", chooseChord(["power", "dom7", "sus2", "sus4", "dom9", "dom11", "dom13", "dim",
                                    "aug", "b13", "s9", "b9", "halfdim", "four", "four_voice",
                                    "five_voice"]));


var progression = {
"doowop" : [[0, "major"], [5, "minor"], [3, "major"], [4, "major"]],
"majorprog": [[1, "min7"],[4, "dom7"],[0,"maj7"]],
"jazz" : [[0, "major"], [5, "minor"], [1, "minor"], [4, "major"]],
"major_scale": {0: "major", 1: "minor", 2: "minor", 3: "major", 4: "major", 5: "minor", 6: "dim"},
"minor_scale": {0: "major", 1: "dim", 2: "major", 3: "minor", 4: "minor", 5: "major", 6: "major"},
"secondarydom" : [[3, "major"], [4, "major"], [4, "maj6"], [5, "minor"]]};


var noteDuration = [96, 64, 48, 32, 24, 16, 12, 8, 6, 4, 3, 2];
var noteDurationHash = {96:'1n.' , 64:'1n', 48:'2n.', 32: '2n', 24:'4n.', 16:'4n', 12:'8n.', 8:'8n', 6:'16n.', 4:'16n', 3:'32n.', 2:'32n'}; // 16 = Quarter Note

var vol = new Tone.Volume(-8).toMaster();
var polySynth = new Tone.PolySynth(3, Tone.Synth);

polySynth.connect(vol);


var drum = new Tone.Players({

    "kick":'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/kick.mp3',
    "snare": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/snare.mp3',
    "hihat": 'https://cdn.jsdelivr.net/gh/Tonejs/Tone.js/examples/audio/505/hh.mp3'

});

