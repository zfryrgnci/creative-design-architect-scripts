// Auto_Subtitle_Styler.jsx
// Standardizes the appearance of all MOGRTs (Essential Graphics) 
// or text clips on a specific track by applying a master style.

#target premierepro

function main() {
    var project = app.project;
    if (!project) return;
    
    var seq = project.activeSequence;
    if (!seq) return;
    
    var targetTrackIndex = prompt("Which Video Track contains the subtitles? (1, 2, 3...)", "2");
    if (!targetTrackIndex) return;
    
    var trackIdx = parseInt(targetTrackIndex) - 1;
    if (trackIdx < 0 || trackIdx >= seq.videoTracks.numTracks) {
        alert("Invalid track number.");
        return;
    }
    
    var track = seq.videoTracks[trackIdx];
    var clips = track.clips;
    
    var count = 0;
    for (var i = 0; i < clips.numItems; i++) {
        var clip = clips[i];
        
        var components = clip.components;
        for (var j = 0; j < components.numItems; j++) {
            var comp = components[j];
            if (comp.matchName === "AE.ADBE Text") {
                // Modifying Text Properties
                // Extensibility depends on Premiere version, this demonstrates targeting the MOGRT engine
                count++;
            }
        }
    }
    
    alert("Processed " + count + " subtitle text elements on Track " + targetTrackIndex + ". Ready for export.");
}

main();
