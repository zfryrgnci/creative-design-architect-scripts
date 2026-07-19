// Null_Swarm_Linker.jsx
// Creates a master Null object and parents all currently selected layers
// to it, allowing for instant swarm transformations and scaling.

{
    app.beginUndoGroup("Null Swarm Linker");
    
    var comp = app.project.activeItem;
    if (comp == null || !(comp instanceof CompItem)) {
        alert("Please open a composition.");
    } else {
        var sel = comp.selectedLayers;
        if (sel.length === 0) {
            alert("Select the layers you want to link.");
        } else {
            // Find center point of all selected layers
            var minX = 99999, maxX = -99999, minY = 99999, maxY = -99999;
            
            for (var i = 0; i < sel.length; i++) {
                var pos = sel[i].property("Position").value;
                if (pos[0] < minX) minX = pos[0];
                if (pos[0] > maxX) maxX = pos[0];
                if (pos[1] < minY) minY = pos[1];
                if (pos[1] > maxY) maxY = pos[1];
            }
            
            var centerX = (minX + maxX) / 2;
            var centerY = (minY + maxY) / 2;
            
            var masterNull = comp.layers.addNull();
            masterNull.name = "Master_Swarm_Null";
            masterNull.property("Position").setValue([centerX, centerY]);
            
            // Parent layers to Null
            for (var j = 0; j < sel.length; j++) {
                sel[j].parent = masterNull;
            }
            
            masterNull.selected = true;
            alert("Swarm linked! Transform the Null to move the swarm.");
        }
    }
    
    app.endUndoGroup();
}
