/* Global variables */

var stream,
    recorder,
    data,
    recordBtn = document.getElementById('record'),
    stopBtn = document.getElementById('stop'),
    state = document.getElementById('state'),
    audioFile,
    audioElement = document.getElementById('audio');
/* Notes: I placed the sream var in the global scope because I want to be able to use it wherever I want. */

recordBtn.onclick = function() {
    /* First ask for permission to record audio */
    navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        })
        .then(function(audioStream) {
            /* Now we set the global stream to the stream we are currently capturing */
            stream = audioStream;
            startRecorder();
        });
};

stopBtn.onclick = function() {
    stopRecorder();
}

function startRecorder() {
    /* First we create our recorder */
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = function(_eve) {
        console.log('data available');
        // audioFile = new Blob([_eve.data], { type: 'audio/ogg; codecs="vorbis"' });
        // console.log('Data:', audioFile);
        // audioElement.src = window.URL.createObjectURL(audioFile);
        audioElement.src = window.URL.createObjectURL(_eve.data);
        audioElement.play();
    };
    recorder.start();
    state.innerHTML = "Recording!";
}

function stopRecorder() {
    recorder.stop();
    state.innerHTML = "Recording Stopped!";
}