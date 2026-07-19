// Batch_Sequence_Creator.jsx
// Creates an individual sequence for every selected project item in the bin.
// Great for setting up dailies or batch rendering individual clips.

#target premierepro

function main() {
    var project = app.project;
    if (!project) return;
    
    var view = project.getProjectViewIDs();
    if (view.length === 0) return;
    
    var binItems = project.documentID ? project.rootItem.children : null; // Fallback
    
    // Simplification for ExtendScript API: loop through root level
    var root = project.rootItem;
    var count = 0;
    
    for (var i = 0; i < root.children.numItems; i++) {
        var item = root.children[i];
        
        // If it's a clip (not a bin, not a sequence)
        if (item.type === ProjectItemType.CLIP) {
            var seqName = item.name + "_Sequence";
            var newSeq = project.createNewSequence(seqName, ""); // Uses default preset
            
            if (newSeq) {
                var track = newSeq.videoTracks[0];
                track.insertClip(item, 0); // Insert at 0
                count++;
            }
        }
    }
    
    alert("Batch created " + count + " sequences from root clips.");
}

main();
