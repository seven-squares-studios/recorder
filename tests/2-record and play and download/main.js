/* Global variables */

var stream,
    recorder,
    data,
    recordBtn = document.getElementById('record'),
    stopBtn = document.getElementById('stop'),
    state = document.getElementById('state'),
    audioFile,
    audioElement = document.getElementById('audio'),
    audioLink,
    downloadElement = document.getElementById('download');
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
    recorder = new MediaRecorder(stream, { "mimeType": "audio/webm" });
    recorder.ondataavailable = function(_eve) {
        console.log('data available');
        /* Convert to ogg */
        audioFile = new Blob([_eve.data], { type: 'audio/ogg; codecs="vorbis"' });
        console.log('Data:', audioFile);
        audioLink = window.URL.createObjectURL(audioFile);
        /* Play the audio */
        audioElement.src = audioLink;
        audioElement.play();

        /* Set download link */
        downloadElement.href = audioLink;
        downloadElement.innerHTML = "Click to Download";
    };
    recorder.start();
    state.innerHTML = "Recording!";
}

function stopRecorder() {
    recorder.stop();
    state.innerHTML = "Recording Stopped!";
}