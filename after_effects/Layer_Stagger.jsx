// Layer_Stagger.jsx
// Takes all selected layers and staggers their start times by a 
// specified number of frames, creating an instant cascade animation effect.

{
    app.beginUndoGroup("Layer Stagger");
    
    var comp = app.project.activeItem;
    if (comp == null || !(comp instanceof CompItem)) {
        alert("Please open a composition.");
    } else {
        var sel = comp.selectedLayers;
        if (sel.length < 2) {
            alert("Select at least 2 layers to stagger.");
        } else {
            var framesStr = prompt("How many frames to stagger by?", "5");
            if (framesStr) {
                var frames = parseInt(framesStr, 10);
                var frameDur = comp.frameDuration;
                var offset = frames * frameDur;
                
                for (var i = 0; i < sel.length; i++) {
                    // Stagger ascending order based on selection
                    sel[i].startTime = sel[0].startTime + (i * offset);
                }
                alert("Layers staggered by " + frames + " frames.");
            }
        }
    }
    
    app.endUndoGroup();
}
